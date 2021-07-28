import React from "react";

const player_chair_positions = {
    0: {
        left: 265,
        top: 353
    },
    1: {
        left: 450,
        top: 353
    },
    2: {
        left: 634,
        top: 353
    },
    3: {
        left: 834,
        top: 290
    },
    4: {
        left: 834,
        top: 105
    },
    5: {
        left: 634,
        top: 10
    },
    6: {
        left: 450,
        top: 10
    },
    7: {
        left: 265,
        top: 10
    },
    8: {
        left: 82,
        top: 105
    },
    9: {
        left: 82,
        top: 290
    }
};

function Player({ player, ...props }) {
    return (
        <div
            className="play_three"
            style={{
                position: "absolute",
                ...player_chair_positions[player.chair]
            }}
        >
            <div className="play_info_body" style={{ position: "relative" }}>
                <div
                    className="player_info_container"
                    style={{
                        top: 80,
                        visibility: "visible",
                        opacity: 1
                    }}
                >
                    <a
                        id="popover-e4da3b7fbbce2345d7772b0674a318d5"
                        title="Bot1"
                        data-content="Loading..."
                        href="https: //54.185.213.141/index.php?option=com_camerona&amp, format=raw&amp;view=profile&amp;user_id=5&amp;table_id=28"
                        name="popover-e4da3b7fbbce2345d7772b0674a318d5"
                    ></a>
                    <div
                        id="e4da3b7fbbce2345d7772b0674a318d5"
                        className="player_info my_player_info"
                        style={{
                            visibility: "visible",
                            opacity: 1
                        }}
                    >
                        <div className="player_info_contents">
                            <div
                                className="connection_status connection_status_0"
                                title="Connection: Good"
                            ></div>
                            <div className="avatar_image_container">
                                <img
                                    id="img_e4da3b7fbbce2345d7772b0674a318d5"
                                    src="/components/com_camerona/assets/images/no_avatar.png"
                                    className="player_img"
                                    name="img_e4da3b7fbbce2345d7772b0674a318d5"
                                    alt="player 1"
                                />
                            </div>
                            <div
                                id="name_e4da3b7fbbce2345d7772b0674a318d5"
                                className="player_name"
                            >
                                {player.username}
                            </div>
                            <div
                                id="cash_e4da3b7fbbce2345d7772b0674a318d5"
                                className="player_cash"
                            >
                                190.00
                            </div>
                            <div
                                id="cash_e4da3b7fbbce2345d7772b0674a318d5"
                                className="player_cash"
                            >
                                190.00
                            </div>
                            <div className="indicators">
                                <div
                                    className="dealer"
                                    title="Dealer Button"
                                ></div>
                                <div
                                    className="small_blind"
                                    title="Small Blind"
                                    style={{}}
                                ></div>
                                <div
                                    className="big_blind"
                                    title="Big Blind"
                                    style={{ display: "none" }}
                                ></div>
                            </div>
                        </div>
                        <div className="player_timer_container">
                            <div
                                className="player_timer"
                                style={{ width: 61 }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div
                    className="betting_info"
                    style={{ position: "absolute", top: 0 }}
                >
                    <div
                        id="betting_round_sum_e4da3b7fbbce2345d7772b0674a318d5"
                        className="betting_round_sum label success"
                        style={{
                            left: 32,
                            top: 0,
                            visibility: "visible",
                            opacity: 1
                        }}
                    >
                        <span>10.00</span>
                    </div>
                    <div
                        id="latest_action_e4da3b7fbbce2345d7772b0674a318d5"
                        className="latest_action alert-message warning"
                        style={{
                            left: 15,
                            top: 60,
                            visibility: "hidden",
                            opacity: 0
                        }}
                    >
                        <span>Post small blind.</span>
                    </div>
                    <div
                        id="countdown_e4da3b7fbbce2345d7772b0674a318d5"
                        className="countdown label notice"
                        style={{
                            left: 20,
                            top: 155,
                            visibility: "visible"
                        }}
                    >
                        28
                    </div>
                </div>

                {/* CARD LEFT BOTTOM */}
                <div
                    className="card_left_bottom"
                    style={{
                        position: "absolute",
                        left: -41,
                        top: 27
                    }}
                >
                    <div className="card_body" style={{ position: "relative" }}>
                        {/* CARD NO.1 */}
                        <div
                            id="card1_e4da3b7fbbce2345d7772b0674a318d5"
                            className="card card_back card_0"
                            style={{
                                visibility: "visible",
                                left: 0,
                                top: 0,
                                opacity: 1
                            }}
                        >
                            <img
                                src="components/com_camerona/assets/images/themes/default//cards/allcards_normal.png"
                                alt="card left bottom 1"
                            />
                        </div>
                        {/* CARD NO.2 */}
                        <div
                            id="card2_e4da3b7fbbce2345d7772b0674a318d5"
                            className="card card_back card_1"
                            style={{
                                visibility: "visible",
                                top: 0,
                                left: 34,
                                opacity: 1
                            }}
                        >
                            <img
                                src="components/com_camerona/assets/images/themes/default//cards/allcards_normal.png"
                                alt="card left bottom 2"
                            />
                        </div>
                        {/* CARD NO.3 */}
                        <div
                            id="card2_e4da3b7fbbce2345d7772b0674a318d5"
                            className="card card_back card_2"
                            style={{
                                visibility: "visible",
                                top: 0,
                                left: 68,
                                opacity: 1
                            }}
                        >
                            <img
                                src="components/com_camerona/assets/images/themes/default//cards/allcards_normal.png"
                                alt="card left bottom 3"
                            />
                        </div>
                        {/* CARD NO.4 */}
                        <div
                            id="card2_e4da3b7fbbce2345d7772b0674a318d5"
                            className="card card_back card_3"
                            style={{
                                visibility: "visible",
                                top: 0,
                                left: 101,
                                opacity: 1
                            }}
                        >
                            <img
                                src="components/com_camerona/assets/images/themes/default//cards/allcards_normal.png"
                                alt="card left bottom 4"
                            />
                        </div>
                        {/* CARD NO.5 */}
                        <div
                            id="card2_e4da3b7fbbce2345d7772b0674a318d5"
                            className="card card_back card_4"
                            style={{
                                visibility: "visible",
                                top: 0,
                                left: 133,
                                opacity: 1
                            }}
                        >
                            <img
                                src="components/com_camerona/assets/images/themes/default//cards/allcards_normal.png"
                                alt="card left bottom 5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;
