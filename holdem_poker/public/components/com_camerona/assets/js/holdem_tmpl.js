var auth_check_required = game_params.auth_check_required;
var authorize_popup = undefined;
var game = undefined;
var last_client_error_logged = undefined;
window.onerror = function(error_msg, url, line_number) {
    var cur_time = Math.floor(new Date().getTime() / 1e3);
    if (
        game &&
        (undefined == last_client_error_logged ||
            cur_time - last_client_error_logged > 10)
    ) {
        last_client_error_logged = Math.floor(new Date().getTime() / 1e3);
        var data = {
            msg: error_msg,
            url: url,
            line_number: line_number,
            hand_id: game.game_meta.gameplay_history_id,
            table_instance_id: game.game_meta.table_instance_id,
            debug_log: game.debug_log
        };
        var request = new Request.JSON({
            method: "post",
            onComplete: function() {
                location.reload();
            }
        });
        request.send({
            url:
                game_params.base_url +
                "index.php?option=com_camerona&format=raw&task=recordClientError",
            data: { json: JSON.encode(data) }
        });
    }
};
function holdemInit() {
    game = new HoldemGame({
        base_url: game_params.base_url,
        is_random_seating_required: game_params.is_random_seating_required,
        is_part_of_tournament: game_params.is_part_of_tournament,
        is_for_money: game_params.is_for_money,
        http_session_id: game_params.http_session_id,
        md5: game_params.md5,
        communicator_server: game_params.communicator_server,
        communicator_port: game_params.communicator_port,
        table_instance_id: game_params.table_instance_id,
        table_div: "holdem_table1",
        card_path: game_params.card_path,
        theme_path: game_params.theme_path,
        sound_path: game_params.sound_path,
        image_path: game_params.image_path,
        ready: holdemInitPart2
    });
}
function holdemInitPart2() {
    var url =
        game_params.base_url +
        "index.php?option=com_camerona&format=raw&task=refreshMade";
    game.communicator
        .getRequest(url, {
            json: JSON.encode({ table_id: game_params.table_instance_id })
        })
        .send();
    if (auth_check_required) {
        new Request.HTML({
            url: $("multifactor_url").get("value"),
            data: { table_id: game_params.table_instance_id },
            evalScripts: true,
            onSuccess: function(
                responseTree,
                responseElements,
                responseHTML,
                responseJavascript
            ) {
                var auth_container = new Element("div");
                auth_container.set("html", responseHTML);
                document.body.grab(auth_container);
                multifactorSetupPart1(function() {
                    var foo = $("dialog_multifactor").retrieve(
                        "Bootstrap.Popup"
                    );
                    if (foo) {
                        foo.destroy();
                    }
                    game.fireEvent("playerAuthorized");
                });
                authorize_popup = new Bootstrap.Popup("dialog_multifactor", {
                    persist: false,
                    closeOnClickOut: false,
                    closeOnEsc: false
                });
                authorize_popup.show();
            }
        }).send();
    } else {
        if (game_params.freeplay_check_required) {
            var popup_data = {
                force_disconnect: false,
                name: "freeplay",
                allow_close: true,
                url: game.table_dom.createUrl({
                    option: "com_camerona",
                    view: "freeplaycheckpopup",
                    format: "raw"
                }),
                use_mask: true
            };
            game.fireEvent("createPopupFromRemote", popup_data);
        } else {
            game.fireEvent("playerAuthorized");
        }
    }
    if (Browser.Platform.ios) {
        $$("a").addEvent("click", function(e) {
            if (!this.hasClass("dropdown-toggle")) {
                var existing_clicks = null;
                if (this.retrieve("events")) {
                    existing_clicks = this.retrieve("events").click;
                }
                if (!existing_clicks || 1 == existing_clicks.values.length) {
                    e.stop();
                    window.location = this.href;
                }
            }
        });
    }
    $("back_to_lobby").show();
    $("back_to_lobby").addEvent("click", function(e) {
        e.stop();
        if ($(game_params.md5) && !game.game_meta.tournament_instance_id) {
            var success_func = function(jsonObj) {
                window.top.onbeforeunload = null;
                window.top.location = $("back_to_lobby").get("href");
            };
            if (
                confirm(
                    "Are you sure that you want to stand up and go back to the lobby?"
                )
            ) {
                game.standupPlayer(success_func);
            }
        } else {
            window.top.onbeforeunload = null;
            window.top.location = $("back_to_lobby").get("href");
        }
    });
    if ($("topbar")) {
        new Bootstrap.Dropdown("topbar");
        var current_games_li = $("topbar")
            .getElement(".custmenu .current_games")
            .getParent();
        current_games_li.addClass("deeper parent dropdown menu");
        var dropdown_ul = new Element("ul", {
            class: "dropdown-menu menu-dropdown"
        });
        current_games_li.grab(dropdown_ul);
        $("topbar")
            .getElement(".current_games")
            .addEvent("click", function(e) {
                e.preventDefault();
                var time_limit = new Date().getTime() - 10 * 1e3;
                if (this.retrieve("last_update", 0) < time_limit) {
                    this.store("last_update", new Date().getTime());
                    dropdown_ul.innerHTML = "";
                    var url =
                        "?option=com_camerona&task=getCurrentGames&format=raw";
                    var request = new Request.JSON({
                        url: url,
                        data: {},
                        onSuccess: function(jsonObj) {
                            if (jsonObj.length > 0) {
                                jsonObj.each(function(el) {
                                    var new_li = new Element("li");
                                    new_li.innerHTML =
                                        '<a href="' +
                                        el.url +
                                        '">' +
                                        el.caption +
                                        "</a>";
                                    dropdown_ul.grab(new_li);
                                });
                            } else {
                                var new_li = new Element("li");
                                new_li.innerHTML =
                                    '<a onclick="return false;" href="#">' +
                                    _("No active Games") +
                                    "</a>";
                                dropdown_ul.grab(new_li);
                            }
                        }
                    }).send();
                }
            });
    }
}
function clearIdleTimeout() {
    var timeout_data = $(document.body).retrieve("idle_timeout_data");
    if (timeout_data) {
        clearInterval(timeout_data.timeout);
        $(document.body).erase("idle_timeout_data");
    }
}
function startIdleTimeout(session_length) {
    clearIdleTimeout();
    var my_timeout = setInterval(idleCallback, 5e3, session_length);
    var idle_timeout_data = {};
    idle_timeout_data.timeout = my_timeout;
    idle_timeout_data.warning_time = new Date().increment(
        "second",
        session_length - 60
    );
    idle_timeout_data.warning_shown = 0;
    idle_timeout_data.redirect_time = new Date().increment(
        "second",
        session_length + 30
    );
    idle_timeout_data.redirect_shown = 0;
    $(document.body).store("idle_timeout_data", idle_timeout_data);
}
function resetIdleTimeout(session_length) {
    var idle_timeout_data =
        $(document.body).retrieve("idle_timeout_data") || {};
    idle_timeout_data.warning_time = new Date().increment(
        "second",
        session_length - 60
    );
    idle_timeout_data.warning_shown = 0;
    idle_timeout_data.redirect_time = new Date().increment(
        "second",
        session_length + 30
    );
    idle_timeout_data.redirect_shown = 0;
    $(document.body).store("idle_timeout_data", idle_timeout_data);
}
function idleCallback(session_length) {
    var cur_time = new Date();
    var idle_timeout_data = $(document.body).retrieve("idle_timeout_data");
    if (
        0 == idle_timeout_data.warning_shown &&
        cur_time.diff(idle_timeout_data.warning_time, "second") < 0
    ) {
        idle_timeout_data.warning_shown = 1;
        $(document.body).store("idle_timeout_data", idle_timeout_data);
        var dialog = game.showModal("idle_timeout");
        dialog
            .getElement(".modal-header h3")
            .set("html", _("COM_CAMERONA_IDLE_HEADER"));
        dialog
            .getElement(".modal-body")
            .set("html", _("COM_CAMERONA_IDLE_BODY"));
        dialog
            .getElement(".modal-footer")
            .set(
                "html",
                '<div class="continue btn">' +
                    _("COM_CAMERONA_STAY_CONNECTED_BTN") +
                    "</div>"
            );
        dialog.getElement(".continue.btn").addEvent("click", function(e) {
            e.stop();
            dialog.destroy();
            game.getTableState();
        });
    }
    if (
        0 == idle_timeout_data.redirect_shown &&
        cur_time.diff(idle_timeout_data.redirect_time, "second") < 0
    ) {
        idle_timeout_data.redirect_shown = 1;
        $(document.body).store("idle_timeout_data", idle_timeout_data);
        window.parent.location = $("back_to_lobby").get("href");
    }
}
