function getPlayerGameSetting(setting) {
	var return_val = undefined;
	var temp = Cookie.read('game_settings');
	var player_game_settings = JSON.decode(temp);
	if (player_game_settings && player_game_settings[setting]) {
		return_val = player_game_settings[setting];
	}
	if (setting == 'disable_animations' && Browser.ie8) {	
		return_val = 1;
	}
	return return_val;
}

/**
 * Replace the default Element.fade to consider the disable animations
 * cookie to determine if the tween should actually be done or a straight css change
 *
 **/
Class.refactor(Element, {
	fade: function(how){
		if (parseInt(getPlayerGameSetting('disable_animations'))) {
			if (isNaN(how)) {
				if (how == 'out') {
					this.setStyle('visibility', 'hidden');
				} else {
					this.setStyle('visibility', 'visible');
				}
			} else {
				//how is a number
				this.setStyle('opacity', how);
			}
			return this;
		} else {
			return this.previous.call(this, how);
		}
	}
});


String.prototype.toFloat = function(){
	var cleaned = this.replace(/,/g, '');
	return parseFloat(cleaned);
}


var SliderEx = new Class({
  Extends: Slider,

  // Binds does not support inheritance..
  // Therefore, we have to declare the new bindings
  // as well as the existing ones.
  Binds: ['clickedElement', 'draggedKnob', 'scrolledElement',
      'releasedElement'],

  releasedElement: function(event) {
    document.removeEvent('mousemove', this.clickedElement);
    document.removeEvent('mouseup', this.releasedElement);
  },

  clickedElement: function(event) {
    if (event.target != this.knob) {
      document.addEvent('mousemove', this.clickedElement);
      event.stop();
    }
    document.addEvent('mouseup', this.releasedElement);

    this.parent(event);
  }
});



var MSlider = new Class({

	Extends: Slider,

	initialize: function(element, knob, options) {
		this.setOptions(options);
		options = this.options;
		this.element = document.id(element);
		knob = this.knob = document.id(knob);
		this.previousChange = this.previousEnd = this.step = -1;

		var limit = {},
			modifiers = {x: false, y: false};

		switch (options.mode){
			case 'vertical':
				this.axis = 'y';
				this.property = 'top';
				this.offset = 'offsetHeight';
				break;
			case 'horizontal':
				this.axis = 'x';
				this.property = 'left';
				this.offset = 'offsetWidth';
		}

		this.setSliderDimensions();
		this.setRange(options.range);

		if (knob.getStyle('position') == 'static') knob.setStyle('position', 'relative');
		knob.setStyle(this.property, -options.offset);
		modifiers[this.axis] = this.property;
		limit[this.axis] = [-options.offset, this.full - options.offset];

		var dragOptions = {
			snap: 0,
			limit: limit,
			modifiers: modifiers,
			onDrag: this.draggedKnob,
			onStart: this.draggedKnob,
			onBeforeStart: (function(){
				this.isDragging = true;
			}).bind(this),
			onCancel: function(){
				this.isDragging = false;
			}.bind(this),
			onComplete: function(){
				this.isDragging = false;
				this.draggedKnob();
				this.end();
			}.bind(this)
		};
		if (options.snap) this.setSnap(dragOptions);

		this.drag = new MDrag(knob, dragOptions);
		this.attach();
		if (options.initialStep !== null) this.set(options.initialStep);
	},

	attach: function(){

		this.element.addEvents({
			'mousedown': this.clickedElement,
			'touchstart': this.clickedElement
		});

		if (this.options.wheel) this.element.addEvent('mousewheel', this.scrolledElement);
		this.drag.attach();
		return this;
	},

	detach: function(){
		this.element.removeEvent('mousedown', this.clickedElement)
			.removeEvent('mousewheel', this.scrolledElement);
		this.drag.detach();
		return this;
	},

	clickedElement: function(event){
		if (this.isDragging || event.target == this.knob) return;

		var dir = this.range < 0 ? -1 : 1,
			position = event.page[this.axis] - this.element.getPosition()[this.axis] - this.half;

		position = position.limit(-this.options.offset, this.full - this.options.offset);

		this.step = Math.round(this.min + dir * this.toStep(position));

		this.checkStep()
			.fireEvent('tick', position)
			.end();
	}

});

/*
---

name: MDrag

description: Makes the Drag class touch friendly

authors: Michaël Boué (@MrSiDD)

license: MIT-style license.

requires: [Drag]

provides: MDrag

...
*/

var MDrag = new Class({
	Extends: Drag,

	initialize: function(){
		var params = Array.link(arguments, {
			'options': Type.isObject,
			'element': function(obj){
				return obj !== null;
			}
		});

		this.element = document.id(params.element);
		this.document = this.element.getDocument();
		this.setOptions(params.options || {});
		var htype = typeOf(this.options.handle);
		this.handles = ((htype == 'array' || htype == 'collection') ? $$(this.options.handle) : document.id(this.options.handle)) || this.element;
		this.mouse = {'now': {}, 'pos': {}};
		this.value = {'start': {}, 'now': {}};


		if (Browser.Platform.ios || Browser.Platform.android) {
			this.selection = 'touchstart';
		}
		else {
			this.selection = (Browser.ie) ? 'selectstart' : 'mousedown';
		}


		if (Browser.ie && !Drag.ondragstartFixed){
			document.ondragstart = Function.from(false);
			Drag.ondragstartFixed = true;
		}

		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: Function.from(false)
		};
		this.attach();
	},

	attach: function(){
		if (Browser.Platform.ios || Browser.Platform.android) {
			this.handles.addEvent('touchstart', this.bound.start);
		}
		else {
			this.handles.addEvent('mousedown', this.bound.start);
		}
		return this;
	},

	detach: function(){
		if (Browser.Platform.ios || Browser.Platform.android) {
			this.handles.addEvent('touchstart', this.bound.start);
		}
		else {
			this.handles.addEvent('mousedown', this.bound.start);
		}
		return this;
	},

	start: function(event){
		var options = this.options;

		if (event.rightClick) return;

		if (options.preventDefault) event.preventDefault();
		if (options.stopPropagation) event.stopPropagation();
		this.mouse.start = event.page;

		this.fireEvent('beforeStart', this.element);

		var limit = options.limit;
		this.limit = {x: [], y: []};

		var z, coordinates;
		for (z in options.modifiers){
			if (!options.modifiers[z]) continue;

			var style = this.element.getStyle(options.modifiers[z]);

			// Some browsers (IE and Opera) don't always return pixels.
			if (style && !style.match(/px$/)){
				if (!coordinates) coordinates = this.element.getCoordinates(this.element.getOffsetParent());
				style = coordinates[options.modifiers[z]];
			}

			if (options.style) this.value.now[z] = (style || 0).toInt();
			else this.value.now[z] = this.element[options.modifiers[z]];

			if (options.invert) this.value.now[z] *= -1;

			this.mouse.pos[z] = event.page[z] - this.value.now[z];

			if (limit && limit[z]){
				var i = 2;
				while (i--){
					var limitZI = limit[z][i];
					if (limitZI || limitZI === 0) this.limit[z][i] = (typeof limitZI == 'function') ? limitZI() : limitZI;
				}
			}
		}

		if (typeOf(this.options.grid) == 'number') this.options.grid = {
			x: this.options.grid,
			y: this.options.grid
		};

		var events;

		if (Browser.Platform.ios || Browser.Platform.android) {
			events = {
				touchmove: this.bound.check,
				touchend: this.bound.cancel
			};
		}
		else {
			events = {
				mousemove: this.bound.check,
				mouseup: this.bound.cancel
			};
		}
		events[this.selection] = this.bound.eventStop;
		this.document.addEvents(events);
	},

	check: function(event){
		if (this.options.preventDefault) event.preventDefault();
		var distance = Math.round(Math.sqrt(Math.pow(event.page.x - this.mouse.start.x, 2) + Math.pow(event.page.y - this.mouse.start.y, 2)));
		if (distance > this.options.snap){
			this.cancel();

			var events;

			if (Browser.Platform.ios || Browser.Platform.android) {
				events = {
					touchmove: this.bound.drag,
					touchend: this.bound.stop
				};
			}
			else {
				events = {
					mousemove: this.bound.drag,
					mouseup: this.bound.stop
				};
			}

			this.document.addEvents(events);
			this.fireEvent('start', [this.element, event]).fireEvent('snap', this.element);
		}
	},

	cancel: function(event){
		var events;

		if (Browser.Platform.ios || Browser.Platform.android) {
			events = {
				touchmove: this.bound.check,
				touchend: this.bound.cancel
			};
		}
		else {
			events = {
				mousemove: this.bound.check,
				mouseup: this.bound.cancel
			};
		}

		this.document.removeEvents(events);

		if (event){
			this.document.removeEvent(this.selection, this.bound.eventStop);
			this.fireEvent('cancel', this.element);
		}
	},

	stop: function(event){
		var events;

		if (Browser.Platform.ios || Browser.Platform.android) {
			events = {
				touchmove: this.bound.drag,
				touchend: this.bound.stop
			};
		}
		else {
			events = {
				mousemove: this.bound.drag,
				mouseup: this.bound.stop
			};
		}

		events[this.selection] = this.bound.eventStop;
		this.document.removeEvents(events);
		if (event) this.fireEvent('complete', [this.element, event]);
	}
});


/**
 * Add an automated chain events play (with delays between each chain)
 *
 **/
var CustomChain = new Class({
	Extends: Chain,

	initialize: function(queue_name) {
		this.can_continue = true;
		this.queue_name = queue_name;
	},

	clearForNext: function(){
		this.can_continue = true;
	},

	playChain: function(delay_time, timeout_int) {
		/*
		if (timeout_int > 10) {
			console.log('timeout_int ' + timeout_int + ' for ' + this.queue_name);
		}
		*/
		delay_time = delay_time ? delay_time : 1;
		if (this.can_continue) {
			if (delay_time > 0) {
				if (false !== this.callChain()) {
					this.can_continue =false;
					this.playChain.delay(delay_time, this, [delay_time]);
				}
			}
		} else {
			timeout_int = timeout_int ? timeout_int : 0;
			if (timeout_int < 100) {
				setTimeout(this.playChain.bind(this), 100, delay_time, ++timeout_int);
			} else {
				this.clearChain();
				this.can_continue = true;
			}
		}
	}
});



var HoldemTableDom = new Class({
	Implements: [Options],
	options: {
		base_url: undefined,
		default_format_options: {decimal: '.', decimals: 2},
		table_instance_id: undefined,
		image_path: undefined,
		sound_path: undefined,
		theme_path: undefined,
		table_div: undefined
	},

	initialize: function(params){
		this.game = params.game;
		this.setOptions(params.options);
		this.animation_chains = {chips: new CustomChain('chips'), cards: new CustomChain('cards'), pocket_cards: new CustomChain('pocket_cards')};
		this.chip_denominations = [.01, .05, .1, .25, 1, 5, 10, 25, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000];
		this.max_chips_to_show_in_pot = 20;
		this.max_num_chips_to_create_per_user = 10;
		this.were_chairs_created = false;
		this.are_pocket_cards_passed = false;
	},


	cleanTable: function(){
		this.are_pocket_cards_passed = false;
		this.options.table_div.getElements('.pots_container .pot:not(.pot_0)').destroy();
		this.options.table_div.getElements('.card').each(function(card_el){
			var animation = card_el.get('morph');
			if (undefined != animation) {
				animation.cancel();
			}
			card_el.removeClass('part_of_winning_hand');
			card_el.removeClass('not_part_of_winning_hand');
		});
		this.options.table_div.getElements('.game_action_controls_container .depressed').removeClass('depressed');
		this.options.table_div.getElements('.player_info.winner').each(function(el){
			el.removeClass('winner');
		});
		this.options.table_div.getElements('.player_info_container').fade(1);
		this.options.table_div.getElements('.latest_action.active').removeClass('active').fade('out');
		this.options.table_div.getElements('.chipsIn').each(function(el){
			var animation = el.get('morph');
			if (undefined != animation) {
				animation.cancel();
			}
			$(el).destroy();
		});
		this.options.table_div.getElements('.indicators .small_blind, .indicators .big_blind, .indicators .dealer').setStyle('display', 'none');
		this.options.table_div.getElements('.mycard, .card1, .card2, .card').setStyles({'opacity': 1, 'visibility':'hidden'});
		this.options.table_div.getElements('.betting_round_sum').setStyle('visibility', 'hidden');

		$('btnTxtCall').set('html', _('COM_CAMERONA_CALL'));
		if (this.game.players_data && this.game.players_data[this.game.md5]) {
			$('btnTxtCall').set('html', _('COM_CAMERONA_CALL') + (this.game.players_data[this.game.md5].bet2do > 0 ? ' ' + Number.format(this.game.players_data[this.game.md5].bet2do.toFloat(), this.options.default_format_options) : ''));
		}

		$('btnTxtRaise').set('html', 'raise_to');
		$('flop_1').setStyles({ visibility:'visible', top: '-900px'});
		$('flop_2').setStyles({ visibility:'visible', top: '-900px'});
		$('flop_3').setStyles({ visibility:'visible', top: '-900px'});
		$('turn').setStyles({ visibility:'visible', top: '-900px'});
		$('river').setStyles({ visibility:'visible', top: '-900px'});
		this.options.table_div.getElements('.mycard').eliminate('is_flipped');
		Object.each(this.animation_chains, function(animation_chain){
			animation_chain.clearChain();
		});
	},


	adjustRaiseRange: function() {
		var slider = $('btnRaise').retrieve('slider');
		var raise_ceil = this.game.getMaxRaiseTo.call(this.game, this.game.md5);
		var raise_floor = this.game.getMinRaiseTo.call(this.game, this.game.md5);
		if (raise_ceil < 0)
			raise_ceil = 0;
		if (raise_floor > raise_ceil)
			raise_floor = raise_ceil;

		//try catch for IE throwning an error on setRange (sometimes..)
		try {
			slider.set(raise_floor).fireEvent('change');
		} catch (ex) {
			;
		}
	},


	//TODO remove the ids from these cards but make sure css and other js 
	//doesn't break when done
	createCommunityCards: function(){
		var flop1 = new  Element('div' , { 'id':'flop_1',  'class':'card flop1'}).injectInside(this.options.table_div.getElement('.community_cards'));
		new Element('img', {'src': this.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(flop1);
		var flop2 = new  Element('div' , { 'id':'flop_2',  'class':'card flop2'}).injectInside(this.options.table_div.getElement('.community_cards'));
		new Element('img', {'src': this.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(flop2);
		var flop3 = new  Element('div' , { 'id':'flop_3',  'class':'card flop3'}).injectInside(this.options.table_div.getElement('.community_cards'));
		new Element('img', {'src': this.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(flop3);
		var turn = new	Element('div' , { 'id':'turn',	'class':'card turn'}).injectInside(this.options.table_div.getElement('.community_cards'));
		new Element('img', {'src': this.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(turn);
		var river = new  Element('div' , { 'id':'river',	'class':'card river'}).injectInside(this.options.table_div.getElement('.community_cards'));
		new Element('img', {'src': this.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(river);
		this.options.table_div.getElements('.big').setStyle('visibility', 'hidden');
	},


	addChat: function(user_md5, username, shout, announce, is_hidden){
		var textChat = this.options.table_div.getElement('.table_chat_log');
		var is_observer = true;
		if (this.game.players_data) {
			Object.each(this.game.players_data, function(element, index) {
				if (element.md5 == user_md5) {
					is_observer = false;
				}
			});
		}
		var playerName = username;
		if (!announce) {
			if(user_md5 == this.game.md5) {
				playerName = _('COM_CAMERONA_ME_ANNOUNCE');
			}
		} else {
			playerName = _('COM_CAMERONA_GAME_ANNOUNCE');
		}
		if('' != playerName || announce) {
			var old_html = textChat.get('html');
			var extra_class = '';
			if (announce) {
				extra_class = 'game_announce';
			}
			var style_str = '';
			if (undefined != is_hidden) {
				style_str = 'display: none;';
			}
			var is_autoscroll = false;
			if ((this.options.table_div.getElement('.table_chat_log').getScroll().y + this.options.table_div.getElement('.table_chat_log').getSize().y) >= (this.options.table_div.getElement('.table_chat_log').getScrollSize().y - 30)) {
				is_autoscroll = true;
			}

			if (this.game.md5 == user_md5) {
				extra_class += ' me_source';
			} else if (playerName == _('COM_CAMERONA_GAME_ANNOUNCE')) {
				extra_class += ' dealer_source';
			} else {
				extra_class += ' otherplayer_source';
			}
			if (is_observer && playerName != _('COM_CAMERONA_GAME_ANNOUNCE')) {
				if (this.game.md5 != user_md5 && parseInt(this.game.getPlayerGameSetting('disable_observer_chat'))){
					return false;
				}
				extra_class += ' observer';
			} else {
				this.showPlayerChat(user_md5, shout);
			}

			var cur_date = new Date();
			var date_display = ((cur_date.getHours() / 12 > 1) ? cur_date.getHours() - 12 : cur_date.getHours()) + ':' + (cur_date.getMinutes() < 10 ? '0' + cur_date.getMinutes() : cur_date.getMinutes());
			if (cur_date.getHours() > 12 ) {
				date_display += 'pm';
			} else {
				date_display += 'am';
			}
			var new_text_id = cur_date.getTime() + '_shout';

			if (_('COM_CAMERONA_GAME_ANNOUNCE') == playerName) {
				textChat.set('html',	old_html + '<div id="' + new_text_id + '" style="' + style_str + '" class="' + extra_class + '"><span class="time">' + date_display + '</span><span class="message">'+shout+'</span></div>');
			} else {
				textChat.set('html',	old_html + '<div id="' + new_text_id + '" style="' + style_str + '" class="' + extra_class + '"><span class="time">' + date_display + '</span><span class="name">'+playerName+'</span><span class="separator">:</span><span class="message">'+shout+'</span></div>');
			}
			var children = this.options.table_div.getElement('.table_chat_log').getChildren();
			if (children.length > this.game.options.max_display_messages) {
				children[0].destroy();
			}

			if (is_autoscroll) {
				this.options.table_div.getElement('.table_chat_log').removeClass('has_new_content');
				this.options.table_div.getElement('.table_chat_log').scrollTo(this.options.table_div.getElement('.table_chat_log').getScroll().x, this.options.table_div.getElement('.table_chat_log').getScrollSize().y);
			} else {
				this.options.table_div.getElement('.table_chat_log').addClass('has_new_content');
			}
		}
	},

	/**
	 * Show an indicator that a player at the table has posted a new chat msg
	 * 
	 **/
	showPlayerChat: function(player_md5, shout_msg){
		var latest_action_id = 'latest_action_' + player_md5;
		if ($(latest_action_id)) {
			if ($(latest_action_id).hasClass('active')) {
				$(latest_action_id).store('prev_html', $(latest_action_id).get('html'));
				setTimeout(function(){
					if ($(latest_action_id).hasClass('active')) {
						$(latest_action_id).set('html', $(latest_action_id).retrieve('prev_html'));
					}
					$(latest_action_id).erase('prev_html');
				}, 2000);
			} else {
				//no active latest action currently shown for this user
				$('latest_action_' + player_md5).fade('in');
				setTimeout(function(){
					if (! $(latest_action_id).hasClass('active')) {
						$(latest_action_id).fade('out');
					}
				}, 2000);
			}
			var truncated_msg = shout_msg;
			var max_len = 25;
			if (truncated_msg.length > max_len) {
				truncated_msg = shout_msg.substr(0, max_len - 3) + '...';
			}
			$(latest_action_id).set('html', truncated_msg);
		}
	},


	/**
	 * put messages in a scrollable div with the most recent messages going to the top of the div
	 *
	 **/
	displayGameAction: function(user_md5, playerName, msg){
		var is_hidden = true;
		if (this.options.table_div.getElement('.btnDealerChat input').get('checked')) {
			is_hidden = undefined;
		}
		this.addChat(0, '', playerName + ' : ' + msg, 1, is_hidden);
	},


	passPocketCards: function(){
		if (! this.are_pocket_cards_passed) {
			this.are_pocket_cards_passed = true;

			if (this.game.md5 && this.game.players_data[this.game.md5]) {
				$('card1_' + this.game.md5).setStyle('visibility', 'hidden');
				$('card2_' + this.game.md5).setStyle('visibility', 'hidden');
				$('card1_' + this.game.md5).store('other_side', this.game.players_data[this.game.md5].cards[0]);
				$('card2_' + this.game.md5).store('other_side', this.game.players_data[this.game.md5].cards[1]);
			}

			var nb_player = Object.getLength(this.game.players_data);
			var playerPlay = 0;

			var players_by_sb_ordering = Object.values(Object.clone(this.game.players_data));
			var starting_key = this.game.hand_data.sb_player_key;
			if (undefined == starting_key) {
				starting_key = this.game.hand_data_bb_player_key;
			}
			var starting_chair_index = this.game.players_data[starting_key].chair;

			players_by_sb_ordering.sort(function(a, b) {
				if (a.chair == starting_chair_index) {
					return -1;
				}
				if (b.chair < starting_chair_index) {
					b.chair += parseInt(this.game_meta.max_num_players);
				}
				if (a.chair < starting_chair_index) {
					a.chair += parseInt(this.game_meta.max_num_players);
				}
				if (a.chair < b.chair) {
					return -1;
				} else {
					return 1;
				}
			}.bind(this.game));

			['card1_', 'card2_'].each(function(card_id_prefix, i){

				Object.each(players_by_sb_ordering, function(player_data, player_index) { 
					//only pass cards to active players. skip over the other clients
					if ('active' != this.game.players_data[player_data.md5].status.toLowerCase()) {
						return;
					}

					if($(card_id_prefix + player_data.md5)) {
						var card_el = $(card_id_prefix + player_data.md5);

						var card_left_offset = 0;
						var card_top_offset = 0;
						if ('card2_' == card_id_prefix) {
							var card_el_size = card_el.getSize();
							if (player_data.md5 == this.game.md5) {
								card_left_offset  = Math.round(card_el_size.x * 0.38);
								card_top_offset = Math.round(card_el_size.y * 0.20);
							} else {
								card_left_offset = Math.round(card_el_size.x * 0.38);
								card_top_offset = Math.round(card_el_size.y * 0.20);
							}
						}

						this.addCardClass(card_el, 'back');
						this.animation_chains.pocket_cards.chain(function(){
							var pocket_card = $(card_id_prefix + player_data.md5);
							pocket_card.setStyle('top', -300);
							var coords = $('chair_' + this.translateChairIndex(this.game.players_data[player_data.md5].chair)).getElement('.cards_marker').getCoordinates();

							var animation = undefined;
							if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
								animation = new Fx.Morph(pocket_card, { frames: 1 })
							} else {
								animation = new Fx.Morph(pocket_card, {duration: 250, transition: Fx.Transitions.Sine.easeOut});
							}
							(function(player_data, pocket_card, i){
								animation.addEvent('start', function(){
									pocket_card.setStyles({'opacity': 1, 'visibility':'visible'});
								});
								animation.addEvent('complete', function(){
									if (player_data.cards[i]) {
										this.addCardClass(pocket_card, player_data.cards[i]);
									}
									this.animation_chains.pocket_cards.clearForNext();
								}.bind(this));
							}.bind(this))(player_data, pocket_card, i);
							animation.start({
								'top': [-300, coords.top + card_top_offset],
								'left': [(this.options.table_div.getStyle('width').toInt() / 2), coords.left + card_left_offset]});
						}.bind(this));
					}
				}.bind(this));
			this.animation_chains.pocket_cards.playChain();
			}.bind(this));
		}
	},


	showFlop: function(force_animations_disabled){
		var are_animations_disabled = parseInt(this.game.getPlayerGameSetting('disable_animations')) || undefined !== force_animations_disabled;
		this.addCardClass($('flop_1'), this.game.hand_data.flop[0]);
		this.addCardClass($('flop_2'), this.game.hand_data.flop[1]);
		this.addCardClass($('flop_3'), this.game.hand_data.flop[2]);
		this.playSound('card_deal_flop');
		var marker_one = this.options.table_div.getElement('.flop1_marker');
		var new_pos_one = marker_one.getPosition(marker_one.getParent());
		var card_one_styles = {
			'top': new_pos_one.y,
			'left': new_pos_one.x
		};
		var marker_two = this.options.table_div.getElement('.flop2_marker');
		var new_pos_two = marker_two.getPosition(marker_two.getParent());
		var card_two_styles = {
			'top': new_pos_two.y,
			'left': new_pos_two.x
		};
		var marker_three = this.options.table_div.getElement('.flop3_marker');
		var new_pos_three = marker_three.getPosition(marker_three.getParent());
		var card_three_styles = {
			'top': new_pos_three.y,
			'left': new_pos_three.x
		};
		var card_styles = {1: card_one_styles, 2: card_two_styles, 3: card_three_styles};


		for (var i = 1; i <= 3; i++) {
			var animation = $('flop_' + i).get('morph');
			if (are_animations_disabled) {
				animation.setOptions({frames: 1 });
			} else {
				animation.setOptions({duration: 500, wait: false});
			}
			(function(animation, card_styles, i){
				this.animation_chains.cards.chain(function(){
					animation.start(card_styles[i]);
				}.bind(this));
			}.bind(this))(animation, card_styles, i);
			animation.addEvent('onComplete', function()  {
				this.animation_chains.cards.clearForNext();
			}.bind(this));
		}
		this.animation_chains.cards.playChain();
	},


	 showTurn: function(force_animations_disabled){
		var are_animations_disabled = parseInt(this.game.getPlayerGameSetting('disable_animations')) || undefined !== force_animations_disabled;
		this.addCardClass($('turn'), this.game.hand_data.turn);
		var marker = this.options.table_div.getElement('.turn_marker');
		var new_pos = marker.getPosition(marker.getParent());
		var one_styles = {
				'top': new_pos.y,
				'left': new_pos.x
		}; 
		this.playSound('card_deal');
		var one = undefined;
		var animation = $('turn').get('morph');
		if (are_animations_disabled) {
			animation.setOptions({frames: 1 });
		} else {
			animation.setOptions({duration: 500, wait: false});
		}

		this.animation_chains.cards.chain(function(){
			animation.start(one_styles);
		}.bind(this));
		animation.addEvent('onComplete', function()  {
			this.animation_chains.cards.clearForNext();
		}.bind(this));
		this.animation_chains.cards.playChain();
	},


	showRiver: function(force_animations_disabled){
		var are_animations_disabled = parseInt(this.game.getPlayerGameSetting('disable_animations')) || undefined !== force_animations_disabled;

		this.addCardClass($('river'), this.game.hand_data.river);
		var marker = this.options.table_div.getElement('.river_marker');
		var new_pos = marker.getPosition(marker.getParent());
		var one_styles = {
				'top': new_pos.y,
				'left': new_pos.x
		}; 
		this.playSound('card_deal');
		var one = undefined;
		var animation = $('river').get('morph');
		if (are_animations_disabled) {
			animation.setOptions({frames: 1 });
		} else {
			animation.setOptions({duration: 500, wait: false});
		}

		this.animation_chains.cards.chain(function(){
			animation.start(one_styles);
		}.bind(this));
		animation.addEvent('onComplete', function()  {
			this.animation_chains.cards.clearForNext();
		}.bind(this));
		this.animation_chains.cards.playChain();
	},


	/**
	 * put the big and small blind icons in the correct locations
	 *
	 **/
	updateBlindIndicators: function(){
		this.options.table_div.getElements('.indicators .small_blind, .indicators .big_blind').setStyle('display', 'none');
		if(this.game.hand_data.sb_player_key) {
			$(this.game.hand_data.sb_player_key).getElement('.indicators .small_blind').setStyle('display', '');
		}
		if(this.game.hand_data.bb_player_key) {
			$(this.game.hand_data.bb_player_key).getElement('.indicators .big_blind').setStyle('display', '');
		}
		Object.each(this.game.players_data, function(player_data, player_md5){
			if(player_data.is_dealer) {
				$(player_md5).getElement('.dealer').setStyle('display', '');
			} else {
				$(player_md5).getElement('.dealer').setStyle('display', 'none');
			}
		});
	},


	translateChairIndex: function(raw_chair_index) {
		var new_chair_index = raw_chair_index;
		if (this.game.players_data[this.game.md5]) {
			if (new_chair_index == this.game.players_data[this.game.md5].chair) {
				new_chair_index = 0;
			} else {
				//not current player and the index does need to be translated
				var offset = parseInt(this.game.game_meta.max_num_players) - parseInt(this.game.players_data[this.game.md5].chair);
				new_chair_index = (parseInt(new_chair_index) + parseInt(offset)) % this.game.game_meta.max_num_players;
			}
		}
		return new_chair_index;
	},


	/**
	 * the hand_data bet array:
	 * first level - the betsRound
	 * 2nd level: an ordered list of the bets for the parent bet round
	 * 3rd level: 
	 *  0 => md5 of player
	 *  1 -> the bet amount
	 *  2 -> 'bet message' (action like bet X, check, etc)
	 *  3 -> md5 of bet message, player md5 and current timestamp
	 **/
	showBetsForHand: function(){
		if(this.game.hand_data.bet[this.game.betting_round]) {
			var betting_round_summary = [];
			Object.each(this.game.players_data, function(player_data, player_md5){
				betting_round_summary.push({'md5': player_md5, 'sum': 0});
			});
			this.game.hand_data.bet[this.game.betting_round].each(function(element, index) {
				betting_round_summary.every(function(el){
					if (el.md5 == element[0]) {
						el.sum += element[1].toFloat();
						return false;
					}
					return true;
				});
				//loop over each bet known to this.game round
				if(!this.game.betCounter.contains(element[3])) {						
					//the bet has not yet been processed by the client 
					if (_('COM_CAMERONA_ACTION_FOLD').toLowerCase() == element[2].toLowerCase() && element[0] == this.game.md5){
						['card1_', 'card2_'].each(function(card_id_prefix, i){
							if($(card_id_prefix + this.game.md5)) {
								var card_el = $(card_id_prefix + this.game.md5);
								card_el.store('is_flipped', true);
								this.addCardClass(card_el, 'back');
							}
						}.bind(this));
					}
					this.game.betCounter[this.game.betCounter.length] = element[3];												
					if(element[1] > 0) {
						//amount of bet is greater than 0
						//pull X(element[1]) chips from the player and into the pot
						this.moveChipsToPot(element[1], this.options.table_div.getElement('.pot_0'), element[0]);
						this.options.table_div.getElements('.pot_0').set('html',  Number.format(this.game.getPotSum(), this.options.default_format_options));
						this.playSound('bets');
					}
					if ($('name_' + element[0])) {
						this.game.table_dom.displayGameAction(element[0], $('name_'+element[0]).innerHTML, element[2], 'no');
					}
				}
			}.bind(this));
			betting_round_summary.each(function(el){
				if (el.sum > 0 && this.game.betting_round == this.game.hand_data.game_turn) {
					$('betting_round_sum_' + el.md5).innerHTML = '<span>' + Number.format(el.sum, this.options.default_format_options) + '</span>';
					$('betting_round_sum_' + el.md5).fade('in');
				} else {
					$('betting_round_sum_' + el.md5).fade('out');
				}
			}.bind(this));
		}
	},


	enableRaiseControls: function() {
		$('btnRaise').removeClass('disabled');
		$('btnRaisePlus').removeClass('disabled');
		$('btnRaiseMinus').removeClass('disabled');
		$('raiseSlider').getElement('.knob').removeClass('disabled');
		$('btnRaise').retrieve('slider').attach();
	},

	disableRaiseControls: function() {
		$('btnRaise').addClass('disabled');
		$('btnRaisePlus').addClass('disabled');
		$('btnRaiseMinus').addClass('disabled');
		$('raiseSlider').getElement('.knob').addClass('disabled');
		$('btnRaise').retrieve('slider').detach();
	},


	updateGameInfoBar: function(game_meta_data, game_hand_data) {
		this.options.table_div.getElement('.table_id').innerHTML = game_meta_data.table_instance_id;
		if (game_meta_data.gameplay_history_id) {
			this.options.table_div.getElement('.game_id').innerHTML = '' + game_meta_data.gameplay_history_id;
			window.parent.document.title = document.title.replace(/::[^ ]*$/, '::' + '' + game_meta_data.gameplay_history_id);
		} else {
			this.options.table_div.getElement('.game_id').innerHTML = _('N/A');
		}
		if (game_meta_data.table_type) {
			this.options.table_div.getElement('.game_type').innerHTML = _('COM_CAMERONA_' + game_meta_data.table_type);
		} else {
			this.options.table_div.getElement('.game_type').innerHTML = _('N/A');
		}
		this.options.table_div.getElement('.decision_time').innerHTML = game_meta_data.timer;
		this.options.table_div.getElement('.denomination').innerHTML = Number.format(game_hand_data.smallblind.toFloat(), this.options.default_format_options) + '/' + Number.format(game_hand_data.bigblind.toFloat(), this.options.default_format_options);

		if (game_meta_data.tournament_instance_id) {
			this.options.table_div.getElement('.tournament_id_container').show();
			var tourn_a = new Element('a', {href: this.createUrl({option: 'com_camerona', 'view': 'tournamentpopup', 'id': game_meta_data.tournament_instance_id, format: 'raw'})});
			tourn_a.addEvent('click', function(e){
				e.stop();
				var popup_data = {force_disconnect: false, name: 'tournament', allow_close: true, url: tourn_a.get('href')};
				this.game.fireEvent('createPopupFromRemote', popup_data);
			}.bind(this));
			tourn_a.set('html', 'T' + game_meta_data.tournament_instance_id);
			this.options.table_div.getElement('.tournament_id').innerHTML = '';
			this.options.table_div.getElement('.tournament_id').grab(tourn_a);
			window.parent.document.title = document.title.replace(/::[^ ]*$/, '::' + tourn_a.innerHTML);
		}
	},


	addPlayerTimer: function(player_info_id) {
		this.removeExistingPlayerTimer();

		$('countdown_' + player_info_id).setStyle('visibility', 'visible');
		var player_timer_container_el = new Element('div', {'class': 'player_timer_container'});
		$(player_info_id).grab(player_timer_container_el);
		player_timer_container_el.innerHTML = '<div class="player_timer"></div>';
		var player_info_key = 0;
		Object.each(this.game.players_data, function(e, i){
			if (player_info_id == e.md5) {
				player_info_key = i;
				return false;
			}
		});
		var full_tween_timer = this.game.game_meta.timer.toInt() * 1000;
		var tween_timer = (this.game.game_meta.timer.toInt() - (this.game.game_meta.server_time - this.game.players_data[player_info_key].myturn_start_time)) * 1000;
		var initial_timer_width = player_timer_container_el.getStyle('width').toInt() * (tween_timer / full_tween_timer);
		var timer_chain = new Fx.Tween(player_timer_container_el.getElement('.player_timer'), {duration: tween_timer, transition: Fx.Transitions.Linear, fps: 15}).start('width', initial_timer_width, 0);
		$(player_info_id).store('countdown_interval', setInterval(function(){
			tween_timer -= 1000;
			if (tween_timer >= 0) {
				$('countdown_' + player_info_id).innerHTML = tween_timer / 1000;

				if(true == this.game.is_my_turn) {
					var resolved_time = Math.floor(tween_timer/1000);
					if (resolved_time > 0 && resolved_time <= 3) {
						var sounds_played = player_timer_container_el.retrieve('sounds_played_at_seconds', []);
						if (-1 == Array.indexOf(resolved_time)) {
							sounds_played.push(resolved_time);
							player_timer_container_el.store('sounds_played_at_seconds', sounds_played);
							this.playSound('beep');
						}
					}
				}
			}
		}.bind(this), 1000));
		timer_chain.chain(function(){this.game.playerTimerFinished(player_info_id)}.bind(this));
		$(player_info_id).store('timer_chain', timer_chain);
	},


	removeExistingPlayerTimer: function(){
		this.options.table_div.getElements('.player_timer_container').each(function(el){
			el.eliminate('sounds_played_at_seconds');
			clearInterval($(el).getParent('.player_info').retrieve('countdown_interval'));
			$('countdown_' + $(el).getParent('.player_info').get('id')).setStyle('visibility', 'hidden');
			$('countdown_' + $(el).getParent('.player_info').get('id')).innerHTML = 0;
			var running_chain = $(el).getParent('.player_info').retrieve('timer_chain');
			running_chain.cancel();
			$(el).destroy();
		});
	},


	deletePlayer: function (player_md5){
		var username = $('name_' + player_md5).innerHTML;
		this.displayGameAction(0, username, username + ' ' + _('COM_CAMERONA_LEFT_THE_TABLE'), 'no');

		var running_chain = $(player_md5).retrieve('timer_chain');
		if (running_chain) {
			running_chain.cancel();
		}
		clearInterval($(player_md5).retrieve('countdown_interval'));
		$('countdown_' + player_md5).setStyle('visibility', 'hidden');
		$('countdown_' + player_md5).innerHTML = 0;

		var animation = $(player_md5).getParent().get('tween');
		if (animation) {
			animation.cancel();
		}
		var animation = $(player_md5).getParent().get('morph');
		if (animation) {
			animation.cancel();
		}

		$(player_md5).retrieve('extra_player_info_to_destroy').each(function(el){
			//elements not nested in the player info div, but that are associated
			//and should also be cleaned up
			var animation = el.get('tween');
			if (animation) {
				animation.cancel();
			}
			var animation = el.get('morph');
			if (animation) {
				animation.cancel();
			}
			el.destroy();
		});
		$(player_md5).getParent().destroy();
	},


	/**
	 * create the html for displaying a players avatar, associated info and cards that will be
	 * positioned around the table
	 *
	 **/
	createPlayerAvatar: function(player_data){
		var md5 = player_data.md5;
		var extra_player_info_to_destroy = Array();
		var box_infos = new  Element('div' , { 'id':md5,	'class':'player_info'});
		box_infos.store('chair', this.translateChairIndex(player_data.chair));
		box_info_contents = new Element('div', {'class': 'player_info_contents'});
		box_infos.grab(box_info_contents);
		var connection_status_indicator_el = new Element('div', {'class': 'connection_status connection_status_0'});
		box_info_contents.grab(connection_status_indicator_el);
		var player_img = new	Element('div' , { 'class': 'avatar_image_container'});
		var player_avatar_href= (null != player_data.thumb) ? this.game.options.base_url + player_data.thumb : this.game.options.base_url + '/components/com_camerona/assets/images/no_avatar.png';
		var player_img_raw = new	Element('img' , { 'id':'img_'+md5, 'src': player_avatar_href, 'class':'player_img'}).injectInside(player_img);
		player_img.injectInside(box_info_contents);
		var pl_name = new  Element('div' , { 'id':'name_'+md5, 'class':'player_name', 'html': player_data.username}).injectInside(box_info_contents);
		var pl_cash = new  Element('div' , { 'id':'cash_'+md5, 'class':'player_cash', 'html': Number.format(player_data.chips.toFloat(), this.options.default_format_options)}).injectInside(box_info_contents);
		//indicators can be things like the dealer chip, small/big blinds, etc
		var indicators_div = new Element('div', {'class': 'indicators'}).injectInside(box_info_contents);

		var dealer_div = new	Element('div' , {'class':'dealer','title':'Dealer Button', 'styles': {'display': 'none'}});
		dealer_div.injectInside(indicators_div);
		var small_blind = new Element('div' , {'class':'small_blind','title':'Small Blind', 'styles': {'display': 'none'}}); 
		small_blind.injectInside(indicators_div);
		var big_blind = new Element('div' , {'class':'big_blind','title':'Big Blind', 'styles': {'display': 'none'}}); 
		big_blind.injectInside(indicators_div);

		var box_infos_container = new Element('div', {'class': 'player_info_container'});
		box_infos_container.injectInside(this.options.table_div);
		box_infos.injectInside(box_infos_container);

		var popover_id = 'popover-' + player_data.md5;
		var popover_el = new Element('a', {'id': popover_id});
		popover_el.set('title', player_data.username);
		popover_el.set('data-content', _('COM_CAMERONA_LOADING'));
		popover_el.set('href', this.game.options.base_url + 'index.php?option=com_camerona&format=raw&view=profile&user_id=' + player_data.user_id + '&table_id=' + this.game.options.table_instance_id);

		box_infos_container.grab(popover_el, 'top');
		box_infos_container.addEvent('click', function(e){
			e.stop();
			var existing = $(popover_id).retrieve('is_shown');
			if (existing) {
				$(popover_id).eliminate('is_shown');
				existing.hide();
				existing.destroy.delay(500, existing);
				for (var i = 0; i < extra_player_info_to_destroy.length; i++) {
					if (('profile_view_' + player_data.md5) == extra_player_info_to_destroy[i].id) {
						extra_player_info_to_destroy.splice(i, 1);
						break;
					}
				}
			} else {
				//show it
				var temp = new Bootstrap.Popover(popover_id, {trigger: 'manual'});

				$(popover_id).store('is_shown', temp);
				new Request.HTML({
					url: popover_el.href,
					onSuccess: function(tree, elements, response_html){
						if (temp.tip) {
							temp.tip.getElement('.content').set('html', response_html);
							var real_id = 'profile_view_' + player_data.md5;
							var new_pos_x = real_pos_x = $(real_id).getPosition().x + $(real_id).getSize().x;
							var new_pos_y = real_pos_y = $(real_id).getPosition().y + $(real_id).getSize().y;
							if (real_pos_x > $('holdem_table1').getSize().x) {
								new_pos_x = $('holdem_table1').getSize().x - $(real_id).getSize().x;
								$(real_id).position({x: new_pos_x});
							}
						}
					}.bind(this.game)
				}).send();
				temp.show();
				temp.tip.id = 'profile_view_' + player_data.md5;

				extra_player_info_to_destroy.push(temp.tip);
				$('profile_view_' + player_data.md5).addEvent('click:relay(.close)', function(e){
					e.stop();
					var existing = $(popover_id).retrieve('is_shown');
					if (existing) {
						$(popover_id).eliminate('is_shown');
						existing.hide();
						existing.destroy.delay(500, existing);
						for (var i = 0; i < extra_player_info_to_destroy.length; i++) {
							if (('profile_view_' + player_data.md5) == extra_player_info_to_destroy[i].id) {
								extra_player_info_to_destroy.splice(i, 1);
								break;
							}
						}
					}
				});
			}
		});

		if (player_data.md5 == this.game.md5) {
			box_infos.addClass('my_player_info');
		}

		var marker_pos = $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.avatar_marker').getPosition(this.options.table_div);
		box_infos_container.setStyle('left', marker_pos.x);
		box_infos_container.setStyle('top', marker_pos.y);

		var betting_round_sum_el = new Element('div', {'id': 'betting_round_sum_' + player_data.md5, 'class': 'betting_round_sum label success'});
		betting_round_sum_position = $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.betting_round_sum_marker').getPosition(this.options.table_div); 
		betting_round_sum_el.setStyle('left', betting_round_sum_position.x);
		betting_round_sum_el.setStyle('top', betting_round_sum_position.y);
		betting_round_sum_el.setStyle('visibility', 'hidden');
		betting_round_sum_el.innerHTML = '<span>0</span>';
		extra_player_info_to_destroy.push(betting_round_sum_el);
		this.options.table_div.grab(betting_round_sum_el);

		var latest_action_el = new Element('div', {'id': 'latest_action_' + player_data.md5, 'class': 'latest_action alert-message warning'});
		latest_action_position = $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.latest_action_marker').getPosition(this.options.table_div);
		latest_action_el.setStyle('left', latest_action_position.x);
		latest_action_el.setStyle('top', latest_action_position.y);
		latest_action_el.setStyle('visibility', 'hidden');
		latest_action_el.innerHTML = '';
		extra_player_info_to_destroy.push(latest_action_el);
		this.options.table_div.grab(latest_action_el);

		var countdown_el = new Element('div', {'id': 'countdown_' + player_data.md5, 'class': 'countdown label notice'});
		countdown_position = $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.countdown_marker').getPosition(this.options.table_div);
		countdown_el.setStyle('left', countdown_position.x);
		countdown_el.setStyle('top', countdown_position.y);
		countdown_el.setStyle('visibility', 'hidden');
		countdown_el.innerHTML = '';
		extra_player_info_to_destroy.push(countdown_el);
		this.options.table_div.grab(countdown_el);

		if(1 == player_data.is_celebrity) {
			var celeb_div = new	Element('div' , {'class':'celebrity','title':'Celebrity Player'});
			celeb_div.injectInside(indicators_div);
		}

		//place the player's cards
		var card1 = new  Element('div' , {'id':'card1_'+md5, 'class':'card card1', 'styles': {'visibility': 'hidden'}}).injectInside(this.options.table_div);
		new Element('img', {'src': this.game.options.image_path + this.game.options.theme_path + '/cards/allcards_normal.png'}).injectInside(card1);
		card1.setStyle('left', $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.cards_marker').getPosition().x);
		card1.setStyle('top', $('chair_' + this.translateChairIndex(player_data.chair)).getElement('.cards_marker').getPosition().y);
		var card2 = new  Element('div' , {'id':'card2_'+md5, 'class':'card card2', 'styles': {'visibility': 'hidden'}}).injectInside(this.options.table_div);
		new Element('img', {'src': this.game.options.image_path + this.options.theme_path + '/cards/allcards_normal.png'}).injectInside(card2);

		extra_player_info_to_destroy.push(card1);
		extra_player_info_to_destroy.push(card2);

		if (player_data.md5 == this.game.md5) {
			card1.addClass('mycard');
			card2.addClass('mycard');

			[card1, card2].each(function(card_el){
				card_el.addEvent('mouseover', function(){
					['card1_', 'card2_'].each(function(card_id_prefix, i){
						this.addCardClass($(card_id_prefix + this.game.md5), $(card_id_prefix + this.game.md5).retrieve('other_side'));
					}.bind(this));
				}.bind(this));
			}.bind(this));

			[card1, card2].each(function(card_el){
				card_el.addEvent('mouseout', function(){
					['card1_', 'card2_'].each(function(card_id_prefix, i){
						if (card_el.retrieve('is_flipped')) {
							this.addCardClass($(card_id_prefix + this.game.md5), 'back');
						}
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}

		box_infos.store('extra_player_info_to_destroy', extra_player_info_to_destroy);
	},


	addCardClass: function(card_el, new_card_number) {
		var classes_to_persist = ['mycard', 'not_part_of_winning_hand', 'part_of_winning_hand'];
		var classes_to_set = [];

		Array.each(classes_to_persist, function(class_name) {
			if (card_el.hasClass(class_name)) {
				classes_to_set.push(class_name);
			}
		});

		if (! isNaN(new_card_number)) {
			if (Browser.safari) {
				//safari doesn't play nice when the browser is zoomed. it rounds somehow and throws off percentage calcs
				//also can't rely on card_el.getWidth() to return '47' so it's hardcoded for now
				card_el.getElement('img').setStyle('right', (47 * (new_card_number - 1) * - 1) + 'px');
			} else {
				card_el.getElement('img').setStyle('right', (new_card_number - 1) * - 100 + '%');
			}
		} else {
			if (Browser.safari) {
				card_el.getElement('img').setStyle('right', (47 * 52 * - 1) + 'px');
			} else {
				card_el.getElement('img').setStyle('right', '-5200%');
			}
		}
		classes_to_set.push('card');
		classes_to_set.push('card_' + new_card_number);
		card_el.set('class', '');
		Array.each(classes_to_set, function(class_name) {
			card_el.addClass(class_name);
		});
	},



	updatePlayerAvatar: function(prev_player_data, player_data) {
		$('cash_'+player_data.md5).innerHTML = Number.format(player_data.chips.toFloat(), this.options.default_format_options);
		if(player_data.latency == 0) {
			latency_verbose='Good';
		}
		if(player_data.latency == 1) {
			latency_verbose='Medium';
		}
		if(player_data.latency == 2) {
			latency_verbose='Poor';
		}
		$(player_data.md5).getElement('.connection_status').set('class', 'connection_status ' + 'connection_status_' + player_data.latency);
		$(player_data.md5).getElement('.connection_status').set('title', 'Connection: ' + latency_verbose);

		if (prev_player_data && prev_player_data.status != player_data.status) {
			if ('active' != player_data.status.toLowerCase()) {
				$(player_data.md5).fade(0.5);
			} else {
				$(player_data.md5).fade(1);
			}
		}

		//TODO remove the allin check part?
		if(this.game.hand_data.is_allin) {
			if(player_data.cards[0]) {
				this.addCardClass($('card1_' + player_data.md5), player_data.cards[0]);
				this.addCardClass($('card2_' + player_data.md5), player_data.cards[1]);
			}
		}
	},

	showHandWinner: function(){
		var winnerDesc = '';
		var winnerMsg = '';
		var winnerList = [];
		var winnerPlayers = [];
		var cpt = 0;

		var orig_num_chips_in_pot = this.options.table_div.getElements('.chipsIn').length;
		Object.each(this.game.hand_data.winners_data, function(winner_data, winner_md5) {
			var pot_percentage = parseFloat(winner_data.total) / parseFloat(this.game.getPotSum());
			var num_chips_to_move = Math.ceil(orig_num_chips_in_pot * pot_percentage) ;
			this.movePotChipsToPlayer(winner_md5, num_chips_to_move);
			winnerPlayers[cpt] = winner_md5;
			cpt++;
		}.bind(this));

		if(winnerPlayers.length > 0) {
			if (-1 != winnerPlayers.indexOf(this.game.md5)) {
				this.playSound('winner_is');
			}
			
			Object.each(this.game.players_data, function(element, index) {
				if(winnerPlayers.contains(element.md5)) {
					$(element.md5).addClass('winner');
					var username = element.username;
					var hand_description_text = '';
					if (0 < this.game.hand_data.winners_data[element.md5].hand_description.length) {
						hand_description_text = _('COM_CAMERONA_WON_WITH') + ' ' + this.game.hand_data.winners_data[element.md5].hand_description;
					}
					if (this.game.hand_data.winners_data[element.md5].cards_used) {
						this.options.table_div.getElements('.card').each(function(card_el){
							if (null == card_el.get('class').match(/card_(\d+)/)) {
								return;
							}
							var card_value = card_el.get('class').match(/card_(\d+)/)[1].toInt();
							if (-1 != this.game.hand_data.winners_data[element.md5].cards_used.indexOf(card_value)){
								card_el.addClass('part_of_winning_hand');
								var animation = card_el.get('morph');
								animation.setOptions({'link': 'chain'});
								if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
									animation.setOptions({frames: 1 });
								} else {
									animation.setOptions({duration: 100});
								}
								animation.start({'top': [card_el.getStyle('top').toInt(), card_el.getStyle('top').toInt() - 20]});
							} else {
								card_el.addClass('not_part_of_winning_hand');
							}
						}.bind(this));
					}
					if ('refund' == this.game.hand_data.winners_data[element.md5].hand_description.toLowerCase()) {
						hand_description_text = _('COM_CAMERONA_REFUNDED');
						this.showLatestPlayerAction(element.md5, _('COM_CAMERONA_REFUNDED') + ' ' + Number.format(String(this.game.hand_data.winners_data[element.md5]['total']).toFloat(), this.options.default_format_options), true);
						this.displayGameAction(0, username,	_('COM_CAMERONA_REFUNDED') + ' ' + Number.format(String(this.game.hand_data.winners_data[element.md5]['total']).toFloat(), this.options.default_format_options), 'yes'); 
					} else {
						this.showLatestPlayerAction(element.md5, _('COM_CAMERONA_WON') + ' ' + Number.format(String(this.game.hand_data.winners_data[element.md5]['total']).toFloat(), this.options.default_format_options), true);
						this.displayGameAction(0, username,	_('COM_CAMERONA_WON') + ' ' + Number.format(String(this.game.hand_data.winners_data[element.md5]['total']).toFloat(), this.options.default_format_options) + ' ' + hand_description_text, 'yes');
					}
				}
				if(element.cards[0]) {
					if(! $('card1_' + element.md5).retrieve('is_flipped')) {
						this.addCardClass($('card1_' + element.md5), element.cards[0]);
					}
					if(! $('card2_' + element.md5).retrieve('is_flipped')) {
						this.addCardClass($('card2_' + element.md5), element.cards[1]);
					}
				}
			}.bind(this));	
		}
	},


	/**
	 * create and position chairs on the screen with the distribution depending on the number
	 * of players the table is setup to support
	 **/
	createChairs: function(num_chairs){
		if (! this.were_chairs_created) {
			this.were_chairs_created = true;
			//first array element is the picture orientation to use
			//2nd element is the class name(s) to assign to the chair for styling
			var layouts = {
				2: [['bottom', 'right bottom bottom_right'], ['bottom', 'left bottom bottom_left']],
				3: [['bottom', 'center bottom bottom_center'], ['top', 'left_top top top_left'], ['top', 'right_top top top_right']],
				4: [['bottom', 'right bottom bottom_right'], ['bottom', 'left bottom bottom_left'], ['top', 'left_top top top_left'], ['top', 'right_top top top_right']],
				5: [['bottom', 'center bottom bottom_center'], ['bottom_left_corner', 'far_left bottom bottom_far_left'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top_right_corner', 'top_far_right far_right top_corner'], ['bottom_right_corner', 'far_right bottom bottom_far_right']],
				6: [['bottom', 'right bottom bottom_right'], ['bottom', 'left bottom bottom_left'], ['middle_left', 'middle_left middle'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top_right_corner', 'top_far_right far_right top_corner'], ['middle_right', 'middle_right middle']],
				7: [['bottom', 'center bottom bottom_center'], ['middle_left', 'middle_left middle'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top', 'left_top top top_left'], ['top', 'right_top top top_right'], ['top_right_corner', 'top_far_right far_right top_corner'], ['middle_right', 'middle_right middle']],
				8: [['bottom', 'right bottom bottom_right'], ['bottom', 'left bottom bottom_left'], ['middle_left', 'middle_left middle'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top', 'left_top top'], ['top', 'right_top top'], ['top_right_corner', 'top_far_right far_right top_corner'], ['middle_right', 'middle_right middle']],
				9: [['bottom', 'center bottom bottom_center'], ['bottom_left_corner', 'far_left bottom bottom_far_left'], ['middle_left', 'middle_left middle'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top', 'left_top top top_left'], ['top', 'right_top top top_right'], ['top_right_corner', 'top_far_right far_right top_corner'], ['middle_right', 'middle_right middle'], ['bottom_right_corner', 'far_right bottom bottom_far_right']],
				10: [['bottom', 'right bottom bottom_right'], ['bottom', 'left bottom bottom_left'], ['bottom_left_corner', 'far_left bottom bottom_far_left'], ['middle_left', 'middle_left middle'], ['top_left_corner', 'top_far_left far_left top_corner'], ['top', 'left_top top top_left'], ['top', 'right_top top top_right'], ['top_right_corner', 'top_far_right far_right top_corner'],['middle_right', 'middle_right middle'], ['bottom_right_corner', 'far_right bottom bottom_far_right']]
			};
			var valid_layout = layouts[num_chairs];
			for (i=0; i < valid_layout.length; i++) {
				var new_chair = new Element ('div' , { 'id': 'chair_' + i, 'class': 'chair open'}); 
				new_chair.addClass(valid_layout[i][1]);
				this.options.table_div.getElement('.table_and_chairs').grab(new_chair);
				var chair_img = new Element ('img' , { 'src': this.game.options.image_path + this.game.options.theme_path + 'chairs/' + valid_layout[i][0] + '.png', 'class': valid_layout[i][0]}); 
				new_chair.grab(chair_img);
				var avatar_marker = new Element('div', {'class': 'avatar_marker'});
				new_chair.grab(avatar_marker);
				var countdown_marker = new Element('div', {'class': 'countdown_marker'});
				new_chair.grab(countdown_marker);
				var avatar_marker = new Element('div', {'class': 'cards_marker'});
				new_chair.grab(avatar_marker);
				var sitdown_marker = new Element('div', {'class': 'sitdown_marker'});
				new_chair.grab(sitdown_marker);
				var latest_action_marker = new Element('div', {'class': 'latest_action_marker'});
				new_chair.grab(latest_action_marker);
				var betting_round_sum_marker = new Element('div', {'class': 'betting_round_sum_marker'});
				new_chair.grab(betting_round_sum_marker);
			}
		}
	},


	showLatestPlayerAction: function(player_md5, latest_action_text, allow_multiple_actions){
		if (latest_action_text.toLowerCase() == _('COM_CAMERONA_ALLIN').toLowerCase()) {
			$('latest_action_' + player_md5).addClass('allin');
		} else {
			$('latest_action_' + player_md5).removeClass('allin');
		}
		$('latest_action_' + player_md5).innerHTML = '<span>' + latest_action_text + '</span>';
		if (undefined == allow_multiple_actions) {
			this.options.table_div.getElements('.latest_action.active').removeClass('active').fade('out');
		}
		$('latest_action_' + player_md5).addClass('active').fade('in');
	},


	/**
	 *  If no specific_chair_index is supplied, then hide all sit down buttons
	 *  If a specific_chair_index is supplied, then hide only that chair index
	 **/
	hideSitDownButtons: function(specific_chair_index) {
		this.options.table_div.getElements('.chair').each(function(chair_el, chair_i){
			var is_open = true;
			Object.each(this.game.players_data, function(player_data, player_md5){
				if (this.translateChairIndex(player_data.chair) == chair_i) {
					is_open = false;
				}
			}.bind(this));
			if (undefined === specific_chair_index ||
				  chair_i == specific_chair_index) {
				var sitdown_el = $('sitdown_' + chair_i);
				sitdown_el && sitdown_el.destroy();
				chair_el.removeClass('open');
			}
		}.bind(this));
	},


	showSitDownButtons: function() {
		if (! this.game.is_user_seated &&
				! this.game.is_random_seating_required &&
				! this.game.is_part_of_tournament) {
			this.options.table_div.getElements('.chair').each(function(chair_el, i){
				var is_open = true;
				Object.each(this.game.players_data, function(temp_el, players_data_i){
					if (this.translateChairIndex(temp_el.chair) == i) {
						is_open = false;
					}
				}.bind(this));
				if (is_open && ! $('sitdown_' + i)){
					chair_el.addClass('open');
					var sitdown_el = new Element('div', {'id': 'sitdown_' + i, 'class': 'sitdown btn primary'});
					sitdown_el.innerHTML = _('COM_CAMERONA_SIT_DOWN');
					sitdown_el.setStyle('left', $(chair_el).getElement('.sitdown_marker').getPosition(this.options.table_div).x);
					sitdown_el.setStyle('top', $(chair_el).getElement('.sitdown_marker').getPosition(this.options.table_div).y);
					(function(i){
						sitdown_el.addEvent('click', function(e){
							this.game.getSeatPlayerInfo(i);
						}.bind(this));
					}.bind(this))(i);
					this.options.table_div.grab(sitdown_el);
				}
			}.bind(this));
		}
	},


	displayPots: function(){
		var pot_index = 0;
		var pots_container = this.options.table_div.getElement('.pots_container');
		if (! pots_container)  {
			pots_container = new Element('div', {'class': 'pots_container'}).injectInside(this.options.table_div);
		}
		if (null === this.options.table_div.getElement('.pot_' + pot_index)) {
			//position pots X vertical pixels apart
			var pot = new  Element('div' , { 'class':'btn info pot disable_selection pot_'+pot_index, 'style': 'top: ' + (pot_index * 30) + 'px'});
			pot.innerHTML =  0; 
			pot.inject(pots_container);
		}
	},


	createUrl: function(url_options) {
		var return_val = this.options.base_url + 'index.php?';
		Object.each(url_options, function(val, key) {
			return_val += key + '=' + val + '&';
		});
		return return_val;
	},


	/**
	 * based on game context, enable or disable certain UI buttons for the user
	 *
	 **/
	enableDisableControls: function(force_action_controls_disable){
		//make sure the user is still 'sitting' at the table
		if (this.game.is_user_seated && ! this.game.hand_data.is_allin) {
			if (! this.game.game_meta.is_tournament || 'pending' != this.game.hand_data.table_action) {
				var list = this.options.table_div.getElements('.game_action_controls_container > div');
				if (! this.game.game_meta.is_tournament) {
					$('btnStandUp').setStyle('display', 'block');
				}
				list.each(function(el){
					if (this.game.players_data[this.game.md5].is_allin) {
						el.setStyle('display', 'none');
					} else {
						el.setStyle('display', 'block');
					}
				}.bind(this));
			}
			$('btnAway').setStyle('display', 'block');
			if (this.game.is_my_turn && undefined === force_action_controls_disable) {
				this.options.table_div.getElements('.autoUserAction_container').each(function(el){
					if (Browser.ie || Browser.Platform.ios) {
						el.hide();
					} else {
						el.fade('out');
						el.getNext('span').tween('left', 0);
					}
				});
				var raise_floor = this.game.getMinRaiseTo(this.game.md5);
				if (0 == raise_floor)
					raise_floor = Number.toFloat(this.game.hand_data.bigblind);
				var raise_ceil = this.game.players_data[this.game.md5].chips;
				if (this.game.players_data[this.game.md5].can_raise && raise_ceil > raise_floor) {
					this.enableRaiseControls();
				}
				this.options.table_div.getElement('.game_action_controls_container').getElements('.btn').each(function(el, i) {
					el.removeClass('depressed');
					el.addClass('primary');
				});
			} else {
				this.options.table_div.getElements('.autoUserAction_container').each(function(el){
					if (Browser.ie || Browser.Platform.ios) {
						el.show();
					} else {
						el.fade('in');
						el.getNext('span').tween('left');
					}
				});
				this.disableRaiseControls();
				this.options.table_div.getElements('.game_action_controls_container .btn').each(function(el, i) {
					el.removeClass('primary');
				});
			}

			if ($('btnCall').retrieve('bet_amount') != this.game.players_data[this.game.md5].bet2do){
				$('btnCall').removeClass('depressed');
				$('btnCall').getElements('input').set('checked', false);

			}
			$('btnTxtCall').set('html', _('COM_CAMERONA_CALL') + (this.game.players_data[this.game.md5].bet2do > 0 ? ' ' + Number.format(this.game.players_data[this.game.md5].bet2do.toFloat(), this.options.default_format_options) : ''));

			if (Number.toFloat(this.game.players_data[this.game.md5].bet2do) > Number.toFloat(this.game.players_data[this.game.md5].chips)) {
				$('btnCall').addClass('disabled');
				$('btnCallAny').addClass('disabled');
			} else {
				$('btnCall').removeClass('disabled');
				$('btnCallAny').removeClass('disabled');
			}
			if (this.game.players_data[this.game.md5].bet2do > 0) {
				$('btnCheck').addClass('disabled');
			} else {
				$('btnCheck').removeClass('disabled');
				if (this.game.is_my_turn){
					$('btnCall').addClass('disabled');
					$('btnCallAny').addClass('disabled');
				}
			}

			// this.game is the total bet val required to make the min raise
			var min_raise_bet_amount = (this.game.players_data[this.game.md5].bet2do < Number.toFloat(this.game.hand_data.bigblind)) ? (Number.toFloat(this.game.players_data[this.game.md5].bet2do) + Number.toFloat(this.game.hand_data.bigblind)) : (Number.toFloat(this.game.players_data[this.game.md5].bet2do) * 3);
			max_raise_bet_amount = this.game.players_data[this.game.md5].chips;
			if (this.game.isTypePotLimit()) {
				//only disable when you have more chips than chips in the pot
				if (this.game.players_data[this.game.md5].chips > this.game.getPotSum()){
					$('btnAllIn').addClass('disabled');
				} else {
					$('btnAllIn').removeClass('disabled');
				}
				
				max_raise_bet_amount = Math.min(this.game.players_data[this.game.md5].chips, min_raise_bet_amount + this.game.getPotSum());
			} else if (this.game.isTypeLimit()) {
				if (this.game.players_data[this.game.md5].chips > 0 && this.game.players_data[this.game.md5].chips <= this.game.players_data[this.game.md5].bet2do) { 
					$('btnAllIn').removeClass('disabled');
				} else {
					$('btnAllIn').addClass('disabled');
				}
				if (this.game.hand_data.game_turn <= 1) {
					//in pre-flop and flop
					raise_ceil = Number.toFloat(this.game.hand_data.smallblind);
					raise_floor = Number.toFloat(this.game.hand_data.smallblind);	
				} else {
					//in turn or river
					raise_ceil = Number.toFloat(this.game.hand_data.bigblind);
					raise_floor = Number.toFloat(this.game.hand_data.bigblind);
				}
			}
			if (this.game.players_data[this.game.md5].can_addon) {
				$('btnAddon').show();
			} else {
				$('btnAddon').hide();
			}

			if (this.game.isTypeLimit() && this.game.game_meta.max_num_raises && this.game.getNumRaisesThisTurn() >= this.game.game_meta.max_num_raises) {
				this.game.table_dom.disableRaiseControls();
			}
		} else {
			//not an active player
			this.options.table_div.getElements('.game_action_controls_container > div').each(function(el, i) { 
				el.setStyle('display', 'none');
			});
			this.options.table_div.getElements('#btnStandUp, #btnAway').each(function(el){
				el.setStyle('display', 'none');
			});
		}
	},

	movePotChipsToPlayer: function(player_md5, num_chips_to_move) {
		this.animation_chains.chips.chain(function(){
			var player_coords	= $(player_md5).getCoordinates();					

			if (undefined == num_chips_to_move) {
				num_chips_to_move = Math.floor(this.options.table_div.getElements('.chipsIn').length);
			}
			if (num_chips_to_move <= 0 || this.options.table_div.getElements('.chipsIn').length == 0) {
				this.animation_chains.chips.clearForNext();
				return false;
			}
			var newLeft = player_coords.left+(player_coords.width/2);
			var newTop = player_coords.top+(player_coords.height/2);
			this.options.table_div.getElements('.chipsIn').every(function(chip_el) {
				if (num_chips_to_move-- > 0) {
					var chip_coords = chip_el.getCoordinates();
					var animation = undefined;
					if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
						animation = new Fx.Morph(chip_el, { frames: 1 })
					} else {
						animation = new Fx.Morph(chip_el, {duration: 250, transition: Fx.Transitions.Sine.easeOut});
					}
					animation.start({
						'left': [chip_coords.left, newLeft],
						'top': [chip_coords.top, newTop]});
					animation.addEvent('complete', function(){
						this.animation_chains.chips.clearForNext();
						chip_el.destroy();
					}.bind(this));
				}
				return num_chips_to_move > 0;
			}.bind(this));
		}.bind(this));
		this.animation_chains.chips.playChain();
	},


	moveChipsToPot: function(total_chips_value, potDIV, player_md5){
		this.animation_chains.chips.chain(function(){
			this.createPlayerChips(player_md5, total_chips_value);	
			var chips2Show = this.options.table_div.getElements('.chips_'+player_md5);
			var newLeft = 0;	
			var newTop = 0;	
			chips2Show.reverse();
			var coords	= $(player_md5).getCoordinates();		

			chips2Show.each(function(element, index) {
				var newPos = this.createRandomPotChipPosition(element, potDIV);
				var animation = element.get('morph');
				if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
					animation.setOptions({frames: 1 });
					animation = new Fx.Morph(element, { frames: 1 })
				} else {
					animation.setOptions({duration: 250, transition: Fx.Transitions.Sine.easeOut});
				}
				element.setStyle('display', 'block');						
				element.removeClass('chips_'+player_md5);
				element.addClass('chipsIn');	
				animation.start({
					'left': [(coords.left+(coords.width/2)), newPos[0]],
					'top': [(coords.top+(coords.height/2)), newPos[1]]});
				animation.addEvent('complete', function(){
					this.animation_chains.chips.clearForNext();
				}.bind(this));
			}.bind(this));
		}.bind(this));
		this.animation_chains.chips.playChain();
	},


	createPlayerChips: function(player_md5, total_chips_value){
		var chips_created = 0;
		total_chips_value = String(total_chips_value).toFloat();
		Object.every(this.chip_denominations.sort().reverse(), function(chip_value) {
			var helper_return = this.createPlayerChipsHelper(chip_value, player_md5, total_chips_value, (this.max_num_chips_to_create_per_user - chips_created));
			total_chips_value = helper_return.total_chips_value;
			chips_created += helper_return.num_chips_created;
			return total_chips_value > 0 && chips_created < this.max_num_chips_to_create_per_user;
		}.bind(this));
	},


	createPlayerChipsHelper: function(chip_value, player_md5, total_chips_value, num_chips_allowed_to_add_to_dom) {
		var max_num_chips_to_create = Math.floor(total_chips_value / chip_value);			
		var return_data = {'total_chips_value': total_chips_value, 'num_chips_created': 0, 'num_chips_to_create': 0};
		if(max_num_chips_to_create > 0) {
			return_data.num_chips_to_create = max_num_chips_to_create;
			return_data.total_chips_value -= (chip_value * max_num_chips_to_create); 
			var chip_id_suffix = '';
			for (i=1;i<=max_num_chips_to_create;i++) {
				if (chip_value < 1) {
					chip_id_suffix = '_0' + String(Math.round(chip_value * 100)).pad(2, '0', 'left');
				} else {
					chip_id_suffix = chip_value;
				}
				if (num_chips_allowed_to_add_to_dom > 0) {
					num_chips_allowed_to_add_to_dom--;
					var new_chip = new	Element('div' , {'class':'chip_' + chip_id_suffix + ' chips'});
					var new_chip_img = new Element('img', {'src': this.options.image_path + this.options.theme_path + '/chips/allchips_normal.png'}).injectInside(new_chip);
					new_chip.injectInside(this.options.table_div);
					new_chip_img.setStyle('left', new_chip.getDimensions().width * this.chip_denominations.indexOf(chip_value) * - 1);
					new_chip.addClass('chips_' + player_md5);
				}
				return_data.num_chips_created++;
			}
		}					
		return return_data;
	},


	playSound: function(sound_id) {
		if ($('soundOff').checked && undefined != sound_id) {
			if (soundManager.ok()) {
				var sound_prefix = this.options.sound_path + sound_id + '.';
				var sound_extensions = ['mp3', 'ogg', 'wav'];
				var sound_extension = '';
				for (var i = 0; i < sound_extensions.length; i++) {
					if (soundManager.canPlayURL(sound_prefix + sound_extensions[i])) {
						sound_extension = sound_extensions[i];
						break;
					}
				}
				if ('' != sound_extension) {
					var sound = soundManager.createSound({id: sound_id, url: sound_prefix + sound_extension});
					sound.play();
				}
			}
		}
	},


	/**
	 * Messy positioning of chips in the pot
	 *
	 **/
	createRandomPotChipPosition: function(chip, pot){
		var potCoords = pot.getCoordinates();
		var chipCoords	= chip.getCoordinates();				
		var newLeft = (potCoords.left -	chipCoords.width - 30);
		var newRight = (potCoords.left + potCoords.width + 30 );
		var newTop = (potCoords.top - chipCoords.height - 10);
		var newBottom =  (potCoords.top + potCoords.height + 10);
		var randPos = [];			
		randPos[0] = Math.round(newLeft + (Math.random()*(newRight - newLeft)));
		randPos[1] = Math.round(newTop + (Math.random()*(newBottom - newTop)));			
		return randPos;
	},


	updateClockCountdown: function(container_div, start_time, client_server_clock_skew_ms, only_show_seconds_at_end, zero_callback) {
		if (undefined == only_show_seconds_at_end) {
			only_show_seconds_at_end = false;
		}
		var cur_time = new Date();
		var start_time = new Date(start_time);
		var diff_in_seconds = (start_time.getTime() - cur_time.getTime())/1000;
		diff_in_seconds -= Math.floor(client_server_clock_skew_ms / 1000);
		var hours = Math.floor(diff_in_seconds / (60*60));
		var minutes = Math.floor((diff_in_seconds - (hours * 60 * 60)) / 60);
		var seconds = Math.floor((diff_in_seconds - (hours * 60 * 60)) % 60);
		if (diff_in_seconds <= 0) {
			seconds = minutes = hours = 0;
			if (container_div && container_div.retrieve('clock_timer')) {
				clearInterval(container_div.retrieve('clock_timer'));
				container_div.eliminate('clock_timer');
				if (undefined != zero_callback) {
					zero_callback.call(this);
				}
			}
		}

		var hours_el = container_div.getElement('.time .hours');
		if (0 == hours) {
			hours_el.addClass('empty');
		} else {
			hours_el.removeClass('empty');
		}
		hours_el.innerHTML = String(hours).pad(2, '0', 'left') + ':';
		var minutes_el = container_div.getElement('.time .minutes');
		if (0 == minutes) {
			minutes_el.addClass('empty');
		} else {
			minutes_el.removeClass('empty');
		}
		minutes_el.innerHTML = String(minutes).pad(2, '0', 'left') + ':';
		if (! only_show_seconds_at_end || (only_show_seconds_at_end && 0 == hours && 0 == minutes)) {
			var seconds_el = container_div.getElement('.time .seconds');
			if (0 == seconds) {
				seconds_el.addClass('empty');
			} else {
				seconds_el.removeClass('empty');
			}
			seconds_el.innerHTML = String(seconds).pad(2, '0', 'left');
		}
	},


	movePlayerChair: function(player_data, new_chair_index) {
		$(player_data.md5).store('chair', new_chair_index);

		var avatar_el = $(player_data.md5).getParent();
		var betting_round_sum_el = $('betting_round_sum_' + player_data.md5);
		var latest_action_el = $('latest_action_' + player_data.md5);
		var countdown_el = $('countdown_' + player_data.md5);
		var card1_el = $('card1_' + player_data.md5);
		var card2_el = $('card2_' + player_data.md5);

		var marker_names = ['avatar_marker', 'betting_round_sum_marker', 'latest_action_marker', 'countdown_marker'];
		var elements_to_move = [avatar_el, betting_round_sum_el, latest_action_el, countdown_el];
		
		marker_names.each(function(marker_class_name, i){
			new_position = $('chair_' + new_chair_index).getElement('.' + marker_class_name).getPosition(this.options.table_div);
			var new_styles = {
					'top': new_position.y,
					'left': new_position.x
			}; 
			if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
				elements_to_move[i].setStyles(new_styles);
			} else {
				var move_tween = new Fx.Morph(elements_to_move[i], {duration: 500, transition: Fx.Transitions.Sine.easeOut});
				move_tween.start(new_styles);
			}
		}.bind(this));

		var card2_left_card_offset = card2_el.getPosition().x - card1_el.getPosition().x;
		var card2_top_card_offset = card2_el.getPosition().y - card1_el.getPosition().y;
		new_position = $('chair_' + new_chair_index).getElement('.cards_marker').getPosition();
		var card1_new_styles = {
				'top': new_position.y,
				'left': new_position.x
		};
		var card2_new_styles = {
			'top': new_position.y + card2_top_card_offset,
			'left': new_position.x + card2_left_card_offset
		};
		if (parseInt(this.game.getPlayerGameSetting('disable_animations'))) {
			card1_el.setStyles(card1_new_styles);
			card2_el.setStyles(card2_new_styles);
		} else { 
			var move_tween = new Fx.Morph(card1_el, {duration: 500, transition: Fx.Transitions.Sine.easeOut});
			card1_el.store('running_animations', [move_tween]);
			move_tween.start(card1_new_styles);
			var move_tween = new Fx.Morph(card2_el, {duration: 500, transition: Fx.Transitions.Sine.easeOut});
			card2_el.store('running_animations', [move_tween]);
			move_tween.start(card2_new_styles);
		}
	},


	prepareForSwitchTable: function() {
		this.were_chairs_created = false;
		this.options.table_div.getElements('.chair, .sitdown').destroy();
	},


	initBtnHandlers: function(){
		exception_report = this.options.table_div.getElement('.send_exception_report');
		exception_report.addEvents({
			'click': function(e){
				e.stop();

				if (confirm(_('COM_CAMERONA_SEND_EXCEPTION_REPORT_CONFIRM'))) {
					this.game.sendDebugLog();
				}
			}.bind(this)
		});


		shout_input = this.options.table_div.getElement('.new_table_chat');
		shout_input.value = _('com_camerona_enter_chat');
		shout_input.addEvents({
			'click': function() {
				if (shout_input.value == _('com_camerona_enter_chat')) {
					shout_input.value = '';
				}
			}.bind(this),
			'blur': function() {
				if ('' == shout_input.value) {
					shout_input.value = _('com_camerona_enter_chat');
				}
			}.bind(this),
			'keydown': function(event) {
				if (event.key=="enter" && shout_input.value.length != 0) {
					this.game.addPlayerShout(shout_input.value);
					shout_input.value = '';
				}	else if ('esc' == event.key) {
					shout_input.value = '';
					shout_input.blur();
				}
			}.bind(this)
		});

		/// button allin
		var btnallin = $('btnAllIn');
		if (btnallin) {
			btnallin.addEvent('click', function(e){
				new Event(e).stopPropagation(); 
				if (btnallin.hasClass('disabled')) {
					return false;
				}

				if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
					btnallin.getElement('input').click();
				}
				if (this.game.is_my_turn) {
					this.game.sendPlayerAction('check', this.game.players_data[this.game.md5].chips);
				}
			}.bind(this));
		}

		/// button pass
		var btnpass = $('btnPass');
		btnpass.addEvent('click', function(e){
			new Event(e).stopPropagation(); 
			if (btnpass.hasClass('disabled')) {
				return false;
			}

			if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
				btnpass.getElement('input').click();
			}
			if (this.game.is_my_turn) {
				this.game.sendPlayerAction('pass', 0); 
			}
		}.bind(this));

		/// button check
		var btncheck = $('btnCheck');
		btncheck.addEvent('click', function(e){
			if (btncheck.hasClass('disabled')) {
				new Event(e).stop();
				return;
			}
			new Event(e).stopPropagation(); 
			if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
				btncheck.getElement('input').click();
			}
			if (this.game.is_my_turn) {
				this.game.sendPlayerAction('check', 0);
			}
		}.bind(this));


		// button raise

		var btnraise = $('btnRaise');
		var default_callback = this.game.defaultBtnRaiseCallback.bind(this.game);
		btnraise.store('default_callback', default_callback);
		btnraise.addEvent('click', default_callback);

		var game_this = this.game;

		var raise_slider = new MSlider($('raiseSlider'), $('raiseSlider').getElement('.knob'), {
			range: [1, 100],
			initialstep: 0,
			mode: 'horizontal',
			onChange: function(step){
				if (! game_this.players_data || ! game_this.players_data[game_this.md5]) {
					return;
				}
				var new_step = (!isNaN(step) ? step : this.min); 
				var raise_floor = 0;
				var raise_ceil = 1;
				if (game_this.players_data && game_this.hand_data) {
					raise_ceil = game_this.getMaxRaiseTo.call(game_this, game_this.md5);
					raise_floor = game_this.getMinRaiseTo.call(game_this, game_this.md5);
				}
				raise_floor = raise_floor > raise_ceil ? raise_ceil : raise_floor;
				if (raise_floor < 0) {
					raise_floor = 0;
				}
				var raise_amount = (((new_step - this.min) * (raise_ceil - raise_floor)) / (this.max - this.min)) + Number.toFloat(raise_floor);
				raise_amount *= 100;
				raise_amount = Math.round(raise_amount);
				raise_amount = raise_amount / 100;
				raise_amount = Math.min(raise_amount, game_this.players_data[game_this.md5].chips);
				if (game_this.game_meta && ! game_this.game_meta.use_decimals) {
					raise_amount = Math.round(raise_amount);
				}
				var new_current_raise = Number.format(raise_amount, this.options.default_format_options);
				$('currentRaise').value = new_current_raise;
				if (raise_amount > 0){
					var raise_str = _('raise_to');
					if (0 == game_this.getNumRaisesThisTurn.call(game_this) && 0 != game_this.hand_data.game_turn) {
						raise_str = _('bet');
					}
					var raise_display_value = raise_amount;
					$('btnTxtRaise').set('html', raise_str + ' ' + (raise_display_value > 0 ? Number.format(raise_display_value, this.options.default_format_options) : ''));
					$('btnTxtCall').set('html', _('COM_CAMERONA_CALL') + (game_this.players_data[game_this.md5].bet2do > 0 ? ' ' + Number.format(game_this.players_data[game_this.md5].bet2do.toFloat(), this.options.default_format_options) : ''));
				}
				this.set(new_step);
			}
		});
		btnraise.store('slider', raise_slider); 

		var inputraise = $('currentRaise');
		if (inputraise) {
			inputraise.addEvent('change', function(){
				if (! $('btnRaise').hasClass('disabled')){
					var new_inputraise_value = inputraise.value.toFloat();
					if (isNaN(new_inputraise_value) || new_inputraise_value.toFloat() < this.game.getMinRaiseTo(this.game.md5).toFloat()) {
						new_inputraise_value = this.game.getMinRaiseTo(this.game.md5).toFloat();
						inputraise.value = new_inputraise_value;
					}
					raise_range = this.game.getRaiseRange();
					var new_step = Math.round(100 * ((new_inputraise_value - raise_range.floor) / raise_range.ceil));
					if (new_step > raise_slider.max) {
						raise_slider.set(raise_slider.max);
					} else if (new_step < raise_slider.min) {
						raise_slider.set(raise_slider.min);
					} else {
						var raise_str = _('raise_to');
						if (0 == this.game.getNumRaisesThisTurn()) {
							raise_str = _('bet');
						}
						raise_slider.set(new_step);
						var raise_display_value = new_inputraise_value.toFloat();
						inputraise.value = Number.format(new_inputraise_value, this.options.default_format_options);
						$('btnTxtRaise').set('html', raise_str + ' ' + (raise_display_value > 0 ? Number.format(raise_display_value.toFloat(), this.options.default_format_options) : ''));
					}
				}
			}.bind(this));
		}

		var btnraiseplus = $('btnRaisePlus');
		if (btnraiseplus) {
			btnraiseplus.addEvent('click', function(e){
				new Event(e).stop(); 
				if (btnraiseplus.hasClass('disabled')) {
					return false;
				}
				raise_slider.set(raise_slider.step+1);
			}.bind(this));
			var btnraiseminus = $('btnRaiseMinus');
			btnraiseminus.addEvent('click', function(e){
				new Event(e).stop(); 
				if (btnraiseminus.hasClass('disabled')) {
					return false;
				}
				raise_slider.set(raise_slider.step-1);
			}.bind(this));
		}

		var btncall = $('btnCall');
		btncall.store('bet_amount', 0);
		btncall.addEvent('click', function(e){
			new Event(e).stopPropagation(); 
			if (btncall.hasClass('disabled')) {
				return false;
			}

			if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
				var amount = 0;
				if (this.game.hand_data.bet[this.game.betting_round]) {
					amount = this.game.hand_data.bet[this.game.betting_round].getLast()[1];
				}
				btncall.store('bet_amount', amount);
				btncall.getElement('input').click();
			}
			if (this.game.is_my_turn) {
				this.game.sendPlayerAction('check', this.game.players_data[this.game.md5].bet2do);
			}
		}.bind(this));


		var btncallany = $('btnCallAny');
		if (btncallany) {
			btncallany.addEvent('click', function(e){
				new Event(e).stopPropagation(); 
				if (btncallany.hasClass('disabled')) {
					return false;
				}
				if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
					btncallany.getElement('input').click();
				}
				if (this.game.is_my_turn) {
					this.game.sendPlayerAction('check', this.game.players_data[this.game.md5].bet2do);
				}
			}.bind(this));
		}

		var btncheckfold = $('btnCheckFold');
		if (btncheckfold){
			btncheckfold.addEvent('click', function(e){
				if (btncheckfold.hasClass('disabled')) {
					new Event(e).stop();
					return;
				}
				new Event(e).stopPropagation(); 
				if ('input' != e.target.nodeName.toLowerCase() && ! this.game.is_my_turn) {
					btncheckfold.getElement('input').click();
				}
				this.game.doCheckFold();
			}.bind(this)); 
		}
		
		//handle embedded checkbox that acts to queue events
		var old_this = this;
		this.options.table_div.getElements('.autoUserAction').addEvent('click', function(e){
			if (old_this.game.is_my_turn) {
				e.preventDefault();
			}
			var curr_el = this;
			if (curr_el.checked) {
				curr_el.getParent('.btn').addClass('depressed');
			} else {
				curr_el.getParent('.btn').removeClass('depressed');
			}
			old_this.options.table_div.getElements('.autoUserAction').each(function(el){
				if (curr_el != el) {
					el.getParent('.btn').removeClass('depressed');
					el.checked = false;
				}
			});
		});


		var btnspeaker = $('btnSpeaker');
		if (btnspeaker) {
			var sound_input = $('soundOff');
			if (1 == this.game.getPlayerGameSetting('disable_sound')) {
				sound_input.set('checked', '');
				btnspeaker.fade(0.3);
			}
			btnspeaker.addEvent('click', function(e){
				new Event(e).stop();
				var soundoff = btnspeaker.getElement('input');
				soundoff.set('checked', ! soundoff.get('checked'));
				if (soundoff.get('checked')){
					btnspeaker.fade(1);
				} else {
					btnspeaker.fade(0.3);
				}
			}.bind(this));
		}
		var btndealerchat = this.options.table_div.getElement('.btnDealerChat');
		if (btndealerchat) {
			if (0 == this.game.getPlayerGameSetting('dealer_chat')) {
				this.options.table_div.getElement('.btnDealerChat input').set('checked', '');
				this.options.table_div.getElement('.btnDealerChat').fade(0.3);
			}

			this.options.table_div.getElement('.btnDealerChat').addEvent('click', function(e){
				new Event(e).stop();
				dealer_chat_el = this.options.table_div.getElement('.btnDealerChat input');
				dealer_chat_el.checked = ! dealer_chat_el.checked;
				if (dealer_chat_el.checked){
					this.options.table_div.getElement('.btnDealerChat').fade(1);
					this.options.table_div.getElement('.table_chat_log').getElements('.game_announce').show();
				} else {
					this.options.table_div.getElement('.btnDealerChat').fade(0.3);
					this.options.table_div.getElement('.table_chat_log').getElements('.game_announce').hide();
				}
			}.bind(this));
		}

		var btnStandup = new Element('div' , { 'id':'btnStandUp',	'class':'btn', 'styles': {'display': 'none'}});
		$('meta_game_controls').grab(btnStandup);
		btnStandup.innerHTML = _('COM_CAMERONA_STAND_UP');
		btnStandup.addEvent('click', function(e){
			new Event(e).stop();
			$(this.game.md5).fade(.5);
			this.game.standupPlayer.delay(500, this.game);
		}.bind(this));

		var btnaway = new Element('div' , { 'id':'btnAway','class':'btn'});
		btnaway.setStyle('display', 'none');
		$('meta_game_controls').grab(btnaway);
		btnaway.innerHTML = _('com_camerona_away');
		btnaway.addEvent('click', function(e){
			new Event(e).stop();
			this.game.makePlayerAway();
		}.bind(this));

		//TODO automuck is no longer accurate. rename to player game settings or 
		//such
		var btnautomuck = $('btnAutomuck');
		if (btnautomuck) {
			btnautomuck.addEvent('click', function(e){
				new Event(e).stop();
				var popup_data = {force_disconnect: false, name: 'gamesettings', allow_close: true, url: this.createUrl({option: 'com_camerona', view: 'playergamesettingspopup', format: 'raw', id: this.game.game_meta.tournament_instance_id})};
				this.createPopupFromRemote(popup_data);
			}.bind(this));
		}

		var btnaddon = $('btnAddon');
		if (btnaddon) {
			btnaddon.addEvent('click', function(e){
				new Event(e).stop();
				var popup_data = {force_disconnect: false, name: 'addon', allow_close: true, url: this.createUrl({option: 'com_camerona', view: 'addonpopup', format: 'raw', table_instance_id: this.game.game_meta.table_instance_id})};
				this.createPopupFromRemote(popup_data);
			}.bind(this));
		}
	},

	createPopup: function(popup_data) {
		var orig_name = popup_data.name + '_popup';
		popup_data.name = this.options.table_instance_id + '_' + popup_data.name;
		if ($(popup_data.name)) {
			return false;
		}
		var bootstrap_popup_options = {persist: false, closeOnEsc: false, closeOnClickOut: false, animate: false};
		bootstrap_popup_options.mask = false;
		if (popup_data.use_mask) {
			bootstrap_popup_options.mask = true;
		}

		if (popup_data.force_disconnect) {
			this.game.communicator.forceDisconnect();
		}

		//no url for data, so it better be in the popup_data
		var dialog = this.createPopupHelper(popup_data.name);
		dialog.addClass(orig_name);
		if (popup_data.allow_close) {
			dialog.getElement('.modal-header').set('html', '<a href="#" class="close">x</a>');
			dialog.getElement('.modal-footer').set('html', '<a href="#" class="btn ok">' + _('COM_CAMERONA_OK') + '</a>');
			dialog.getElement('.modal-footer .btn.ok').addEvent('click', function(e){
				new Event(e).stop();
				dialog.retrieve('popup').destroy();
			});
		} else {
			;
		}
		dialog.getElement('.modal-header').set('html', dialog.getElement('.modal-header').get('html') + '<h3>' + _(popup_data.header_html) + '</h3>');
		var new_html = '';
		if ('array' != typeOf(popup_data.body_html)) {
			new_html = _(popup_data.body_html);
		} else {
			Array.each(popup_data.body_html, function(html_str) {
				new_html += _(html_str) + "<br />\n";
			});
		}

		dialog.getElement('.modal-body').set('html', new_html);

		this.enableDisableControls();
		dialog.store('popup', new Bootstrap.Popup(dialog.id, bootstrap_popup_options));
	},


	createPopupFromRemote: function(popup_data) {
		var orig_name = popup_data.name + '_popup';
		popup_data.name = this.options.table_instance_id + '_' + popup_data.name;
		if ($(popup_data.name)) {
			return false;
		}
		var bootstrap_popup_options = {persist: false, closeOnEsc: false, closeOnClickOut: false, animate: false};
		bootstrap_popup_options.mask = false;
		if (popup_data.use_mask) {
			bootstrap_popup_options.mask = true;
		}

		new Request.HTML({
			url: popup_data.url, 
			filter: '.modal',
			evalScripts: true,
			append: this.options.table_div,
			onSuccess: function(tree, elements, response_html){
				var dialog = tree[0];
				dialog.set('id', popup_data.name);
				dialog.addClass(orig_name);
				if (popup_data.force_disconnect) {
					this.game.communicator.forceDisconnect();
				}
				if (! popup_data.allow_close) {
				} else {
					dialog.getElement('.modal-header').set('html', '<a href="#" class="close">x</a>' + dialog.getElement('.modal-header').get('html'));
				}
				dialog.store('popup', new Bootstrap.Popup(dialog, bootstrap_popup_options));
			}.bind(this)
		}).send();
	},


	createPopupHelper: function(popup_name) {
		var dialog_id = 'dialog_' + popup_name;
		if (! $(dialog_id)) {
			var dialog = new Element('div', {'id': dialog_id, 'class': 'modal'});
			this.options.table_div.grab(dialog);
			dialog.innerHTML = '<div class="modal-header"></div>';
			dialog.innerHTML += '<div class="modal-body"></div>';
			dialog.innerHTML += '<div class="modal-footer"></div>';
		}
		return $(dialog_id);
	},


	updateInfoBar: function(){
		if (this.game.clock_skew) {
			var local_time = new Date();
			var server_time = new Date();
			server_time.set('milliseconds', local_time.get('milliseconds') + this.game.clock_skew);
			this.options.table_div.getElement('.server_time .clock').innerHTML = server_time.format("%b %d %I:%M:%S %p");

			if (this.game.tournament_meta && this.game.tournament_meta.time_limit_seconds && this.game.tournament_meta.actual_start_time) {
				this.options.table_div.getElement('.time_remaining').show();
				var time_remaining_el = this.options.table_div.getElement('.time_remaining .clock');
				var timeout_time = ((this.game.tournament_meta.actual_start_time.toInt() + this.game.tournament_meta.time_limit_seconds.toInt()) * 1000);
				this.game_info_bar_interval = this.updateClockCountdown(time_remaining_el, timeout_time, this.game.clock_skew);
			}
		}
	}

});
var HoldemGameCommunicator = new Class({
	Implements: [Options],
	options: {
		table_instance_id: null,
		communicator_server: null,
		communicator_port: null,
		http_session_id: null
	},

	initialize: function(params){
		this.latest_rtt = undefined;
		this.communicator_reconnect_attempts = 0;
		this.communicator_reconnect_interval = undefined;
		this.is_first_fetch = true;

		this.setOptions(params.options);
		this.game = params.game;
		this.communicator = this.createSocketIOConnection();
		this.subscribe();
	},


	getRequest: function(url_in, data_in){
		var communicator_this = this;
		return new Request.JSON({
			headers: {'X-Request': 'JSON'},
			url: url_in,
			data: data_in,
			method: 'post',
			onError: function(body_response, error) {
				communicator_this.game.log('Unable to decode json response');
				communicator_this.handleRequestFailure.call(communicator_this, this.xhr, this.options.url);
			},
			onFailure: function(xhr) {
				communicator_this.handleRequestFailure.call(communicator_this, xhr, this.options.url);
			}.bind(this),
			onRequest: function() {
				resetIdleTimeout(game_params.session_length);
				this.latest_request_start_time = new Date().getTime();
				communicator_this.game.log('Initial request to ' + this.options.url);
			},
			onSuccess: function() {
				communicator_this.game.log('Success on request to ' + this.options.url);
				communicator_this.latest_rtt = new Date().getTime() - this.latest_request_start_time;
			}
		});
	},


	handleRequestFailure: function(xhr, url) {
		this.game.log('Failure on request to ' + url);
		var popup_data = {force_disconnect: false, name: 'request_failure', allow_close: true, header_html: 'COM_CAMERONA_BROADCAST_HEADER', body_html: 'COM_CAMERONA_REQUEST_FAILURE_BODY'};
		this.game.fireEvent('createPopup', popup_data);
	},

	forceDisconnect: function(){
		clearInterval(this.communicator_reconnect_interval);
		this.communicator_reconnect_attempts = 10;
		this.unsubscribe();
		this.communicator.io.socket.disconnect();
	},

	unsubscribe: function() {
		this.communicator.unsubscribe('table_' + this.options.table_instance_id + '_chat');
		this.communicator.unsubscribe('table_' + this.options.table_instance_id);
	}.protect(),


	subscribe: function() {
		this.communicator.subscribe('table_' + this.options.table_instance_id + '_chat', this.game.handleNewChat.bind(this.game));
		this.communicator.subscribe('table_' + this.options.table_instance_id, this.game.handleNewTableState.bind(this.game));
	}.protect(),


	switchSubscription: function(new_table_instance_id) {
		if (new_table_instance_id != this.options.table_instance_id) {
			this.game.log('Switching subscription from ' + this.options.table_instance_id + ' to ' + new_table_instance_id);
			this.unsubscribe();
			this.is_first_fetch = true;
			this.options.table_instance_id = new_table_instance_id;
			this.subscribe();
		}
	},

	createSocketIOConnection: function() {
		var communicator = undefined;
		var communicator_options = {host: this.options.communicator_server, port: this.options.communicator_port, secure: (443 == this.options.communicator_port ? true : false)};

		communicator_options.query = 'session_id=' + this.options.http_session_id;
		communicator = new Communicator(communicator_options);

		communicator.on("connect", this.communicatorConnectCallback.bind(this));
		communicator.on("disconnect", function(){
			clearInterval(this.communicator_reconnect_interval);
			this.communicator_reconnect_interval = setInterval(function(){
				if (this.communicator_reconnect_attempts > 5) {
					clearInterval(this.communicator_reconnect_interval);
					//TODO used to directly hit show connection lost here
					this.game.fireEvent('communicatorConnectionLost');
				} else {
					this.communicator_reconnect_attempts++;
					this.communicatorConnectCallback();
				}
			}.bind(this), 2000)
		}.bind(this));
		//TODO does reconnect still get called?
		communicator.on("reconnect", function(){
			this.game.log("Reconnecting")
		}.bind(this));

		communicator.io.on('getTableState', function(raw_data) {
			var table_state = JSON.decode(raw_data).data;
			if (this.is_first_fetch) {
				this.game.log('First table state fetched for ' + this.options.table_instance_id);
				this.is_first_fetch = false;
				this.game.fireEvent('initialStateReceived', table_state);
			}
			this.game.fireEvent('processNewGameState', table_state);
		}.bind(this));

		communicator.io.on('getMyCards', function(raw_data) {
			clearTimeout(this.game.getMyCards_timeout);
			this.game.getMyCards_timeout = null;
			this.game.getMyCards_failures = 0;
			var cards_data = {cards: JSON.decode(raw_data).data};
			this.game.fireEvent('newMyCards', cards_data);
		}.bind(this));

		communicator.io.on('switch_table', function(raw_data){
			var data = JSON.decode(raw_data);
			if (data.data.game_meta.table_instance_id != this.options.table_instance_id) {
				this.game.log('Trying to switch tables from ' + data.data.game_meta.table_instance_id + ' to ' + data.data.game_meta.max_num_players);
				this.game.switchTableCallback(data.data.game_meta.table_instance_id, data.data.game_meta.max_num_players);
			} else {
				this.game.log('Not trying to switch tables since the same source/dest was provided. From ' + data.data.game_meta.table_instance_id + ' to ' + data.data.game_meta.max_num_players);
			}
		}.bind(this));

		communicator.io.on('fetch_geo_data', function(raw_data){
			this.game.fireEvent('fetchGeoPosition');
		}.bind(this)),

		communicator.io.on('failed_geo_poll', function(raw_data){
			var popup_data = {force_disconnect: false, name: 'geopoll', allow_close: false, url: game.options.base_url + 'index.php?option=com_camerona&view=geofailpopup&format=raw'};
			popup = game.table_dom.createPopupFromRemote(popup_data);
		}.bind(this)),


		communicator.io.on('bet_rejected', function(raw_data){
			this.game.log('bet_rejected and raw_data = ' + raw_data);
			//TODO popup a bit too often so disabled for now
			return false;
			var data = JSON.decode(raw_data);
			var decoded_msgs = data.data.msg;
			var pretty_str = '';
			if ('array' == typeOf(decoded_msgs)) {
				Array.each(decoded_msgs, function(msg){
					pretty_str += _(msg) + "<br>\n";
				});
			} else {
				pretty_str = _(decoded_msgs);
			}
			this.table_dom.displayGameAction(0, _('COM_CAMERONA_GAME_ANNOUNCE'), pretty_str, 'yes');
			var popup_data = {force_disconnect: data.data.force_disconnect, name: 'broadcast', allow_close: data.data.allow_close, header_html: 'COM_CAMERONA_BROADCAST_HEADER', body_html: pretty_str};
			this.game.fireEvent('createPopup', popup_data);
		}.bind(this));

		//TODO allow for reauth without the refresh hack in the future
		communicator.io.on('reauth', function(raw_data){
			window.location.reload();
		}.bind(this));

		communicator.io.on('createPopupFromRemote', function(raw_data){
			this.game.fireEvent('createPopupFromRemote', JSON.decode(raw_data).data);
		}.bind(this));

		communicator.io.on('createPopup', function(raw_data){
			this.game.fireEvent('createPopup', JSON.decode(raw_data).data);
		}.bind(this));

		return communicator;
	}.protect(),


	communicatorConnectCallback: function() {
		if (this.communicator.io.socket.connected) {
			clearInterval(this.communicator_reconnect_interval);
			//TODO TODO
			//the initial table state fetched interval shit was yanked, so make sure
			//the game publishes that to new clients upon connect
		} else {
			//not connected
		}
	},

});
var HoldemGame = new Class({
	Implements: [Events, Options],
	options: {
		base_url: '',
		is_for_money: null,
		is_part_of_tournament: null,
		is_random_seating_required: null,
		md5: null,	
		table_div: null,
		table_instance_id: null,
		image_path: '',
		sound_path: '',
		theme_path: undefined,
		ready: undefined,
		max_display_messages: 100
	},
	
	initialize: function(options){
		this.setOptions(options);		
		this.getMyCards_timeout = null;
		this.getMyCards_failures = 0;
		this.getMyCards_request = null;
		this.max_debug_log_length = 500;
		this.debug_log = [];
		this.md5=this.options.md5;	
		this.table_div = $(this.options.table_div);
		var table_dom_options = {
			base_url: this.options.base_url,
			table_instance_id: this.options.table_instance_id,
			image_path: this.options.image_path,
			sound_path: this.options.sound_path,
			theme_path: this.options.theme_path,
			table_div: $(this.options.table_div)
		};
		this.table_dom = new HoldemTableDom({options: table_dom_options, game: this});
		this.table_instance_id=this.options.table_instance_id;
		this.is_user_authorized = false;
		this.is_random_seating_required = this.options.is_random_seating_required;
		this.is_part_of_tournament = this.options.is_part_of_tournament;
		this.is_my_turn = false;	
		this.betCounter = [];
		this.current_table_round = undefined;
		this.betting_round = 0;
		this.is_user_seated = false;
		this.is_state_initialized = false;
		this.clock_skew = undefined;
		this.bound_event_callbacks = {};
		this.game_meta = undefined;
		this.tournament_meta = undefined;
		this.last_winning_gameplay_history_id = null;

		//TODO :( hacky
		this.seatPlayer_extra_dialog_message = undefined;

		this.table_dom.createCommunityCards();	
		this.table_dom.initBtnHandlers();

		var communicator_options = {
			table_instance_id: this.options.table_instance_id,
			communicator_server: this.options.communicator_server,
			communicator_port: this.options.communicator_port,
			http_session_id: this.options.http_session_id
			};
		this.communicator = new HoldemGameCommunicator({options: communicator_options, game: this});

		var event_mappings = {'playerTurnChange': 'handlePlayerTurnChangeEvent',
			'processNewGameState': 'processNewGameStateEvent',
			'initActiveHand': 'initActiveHandEvent',
			'initOnWinningHand': 'initOnWinningHandEvent',
			'initialStateReceived': 'initialStateReceivedEvent',
			'newMyCards': 'newMyCardsEvent',
			'startFlop': 'startFlopEvent',
			'startTurn': 'startTurnEvent',
			'startRiver': 'startRiverEvent',
			'endHand': 'endHandEvent',
			'addPlayerToTable': 'addPlayerToTableEvent',
			'updatePlayerAvatar': 'updatePlayerAvatarEvent',
			'removePlayerFromTable': 'removePlayerFromTableEvent',
			'startTournament': 'startTournamentEvent',
			'finishTournament': 'finishTournamentEvent',
			'pauseTable': 'pauseTableEvent',
			'unpauseTable': 'unpauseTableEvent',
			'pendingTournament': 'pendingTournamentEvent',
			'playerAuthorized': 'playerAuthorizedEvent',
			'createPopup': 'createPopupEvent',
			'createPopupFromRemote': 'createPopupFromRemoteEvent',
			'communicatorConnectionLost': 'communicatorConnectionLostEvent',
			'fetchGeoPosition': 'fetchGeoPositionEvent'
			}
		Object.each(event_mappings, function(event_function_name, event_name){
			var callback = this.bound_event_callbacks[event_name];
			if (undefined == callback) {
				callback = this.bound_event_callbacks[event_name] = this[event_function_name].bind(this);
			}
			this.removeEvent(event_name, callback);
			this.addEvent(event_name, callback);
		}.bind(this));
	}, 


	log: function(log_str, section) {
		var fancy_str = new Date + ' ';
		if (undefined !== section) {
			fancy_str += section + ':: '
		}
		fancy_str += log_str;
		this.debug_log.push(fancy_str);

		if (this.debug_log.length > this.max_debug_log_length) {
			this.debug_log.splice(0, (this.debug_log.length - this.max_debug_log_length));
		}
	},





	handleNewChat: function(json_data){
		if (undefined != json_data['chat']) {
			this.table_dom.addChat(json_data['user_md5'], json_data['username'], json_data['msg'], 0);
		}
	},


	/**
	 * figure out how much the given player has committed to the specified betting round
	 *
	 **/
	getBettingRoundSum: function(player_md5, round) {
		var sum = 0;
		if (this.hand_data && this.hand_data.bet && this.hand_data.bet[round]) {
			this.hand_data.bet[round].each(function(element, index) {
				if (element[0] == player_md5) {
						sum += element[1].toFloat();
					}
			});
		}
		return sum;
	},


	/**
	 *  Return the maximum amount of money a given player may 'raise to' in the current context
	 *
	 **/
	getMaxRaiseTo: function(player_md5) {
		var raise_to_ceil = 0;

		if (this.isTypeNoLimit()) {
			raise_to_ceil = this.players_data[player_md5].chips;
		} else if (this.isTypePotLimit()) {
			var max_raise_based_on_pot = this.players_data[player_md5].bet2do + this.getPotSum();
			raise_to_ceil = max_raise_based_on_pot;
		} else if (this.isTypeLimit()) {
			if (this.hand_data.game_turn <= 1) {
				//in pre-flop or flop
				var base = Number.toFloat(this.players_data[player_md5].bet2do) + this.getBettingRoundSum(this.players_data[player_md5].md5, this.betting_round); 
				var raise_amount = Number.toFloat(this.hand_data.bigblind);
				raise_to_ceil = base + raise_amount;
			} else {
				//in turn or river
				var base = Number.toFloat(this.players_data[player_md5].bet2do) + this.getBettingRoundSum(this.players_data[player_md5].md5, this.betting_round); 
				var raise_amount = Number.toFloat(this.hand_data.bigblind * 2);
				raise_to_ceil = base + raise_amount;
			}
		}
		return raise_to_ceil;
	},

	/**
	 *  Return the minimum amount the given player may 'raise to' in the current context
	 *
	 **/
	getMinRaiseTo: function(player_md5) {
		var raise_to_floor = 0;
		if (this.isTypeNoLimit() || this.isTypePotLimit()) {
			raise_to_floor = Number.toFloat(this.players_data[player_md5].bet2do) + this.getBettingRoundSum(player_md5, this.betting_round); 
			//also need to add on the minimum raise/bet amount
			min_raise = Math.max(this.hand_data.bigblind, this.hand_data.raise_data.last_valid_raise);
			raise_to_floor += min_raise;
		} else if (this.isTypeLimit()) {
			raise_to_floor += this.getMaxRaiseTo(player_md5);
		}

		return raise_to_floor;
	},


	defaultBtnRaiseCallback: function(e){
		new Event(e).stop(); 
		var btnRaise = $('btnRaise');

		if (btnRaise.hasClass('disabled')) {
			return false;
		}

		var raise_bet = $('currentRaise').get('value').toFloat() - this.getBettingRoundSum(this.md5, this.betting_round);
		this.sendPlayerAction('check', raise_bet);
	},


	doCheckFold: function(){
		var is_done = false;
		if (this.is_my_turn) {
			is_done = true;
			var action = 'check';
			if (this.players_data[this.md5].bet2do > 0)
				action = 'pass';
			this.sendPlayerAction(action, 0);
		}

		return is_done;
	},


	getRaiseRange: function(){
		var raise_floor = 0;
		var raise_ceil = 1;
		if (this.players_data && this.hand_data) {
			raise_ceil = this.players_data[this.md5].chips - Number.toFloat(this.players_data[this.md5].bet2do);
			if (this.isTypePotLimit()) {
				raise_ceil = Math.min(raise_ceil, this.getPotSum());
			} else if (this.isTypeLimit()) {
				if (this.hand_data.game_turn <= 1) {
					//in pre-flop or flop
					raise_ceil = Number.toFloat(this.hand_data.smallblind);
					raise_floor = Number.toFloat(this.hand_data.smallblind);				
				} else {
					//in turn or river
					raise_ceil = Number.toFloat(this.hand_data.bigblind);
					raise_floor = Number.toFloat(this.hand_data.bigblind);
				}
			}
			raise_floor = Number.toFloat(this.players_data[this.md5].bet2do) * 2;
			if (0 == raise_floor || raise_floor < (this.hand_data.bigblind)) {
				raise_floor = this.hand_data.bigblind;
			}
		}
		raise_floor = raise_floor > raise_ceil ? raise_ceil : raise_floor;
		if (raise_floor < 0) {
			raise_floor = 0;
		}
		return {'floor': raise_floor, 'ceil': raise_ceil};
	},


	handleNewTableState: function(json_obj) {
		if (! json_obj ||
					undefined == json_obj['game_meta'] ||
					undefined == json_obj['players'] ||
					undefined == json_obj['game'] ||
					(json_obj['game_meta'].is_tournament && undefined == json_obj['tournament_meta'])){
			return false;
		}
		if (! this.is_state_initialized) {
			return false;
		}

		var prev_game_meta = this.game_meta;
		var prev_players_data = this.players_data;
		var prev_hand_data = this.hand_data;
		var was_switch_table_detected = false;
		if (prev_game_meta && prev_game_meta.table_instance_id != this.options.table_instance_id) {
			was_switch_table_detected = true;
			prev_game_meta = prev_players_data = prev_hand_data = undefined;
		}
		this.game_meta = json_obj['game_meta'];
		this.players_data = json_obj['players'];
		this.hand_data = json_obj['game'];
		if (this.game_meta.is_tournament) {
			this.tournament_meta = json_obj['tournament_meta'];
		}

		//carry forward 'this' player's cards
		if (prev_players_data && prev_players_data[this.md5] && this.players_data[this.md5]) {
			this.players_data[this.md5].cards = prev_players_data[this.md5].cards;
		}

		Object.each(this.players_data, function(player_data){
			if (undefined == prev_players_data || undefined == prev_players_data[player_data.md5]) {
				this.fireEvent('addPlayerToTable', player_data);
			} else {
				var prev_player_data = prev_players_data ? prev_players_data[player_data.md5] : undefined;
				this.fireEvent('updatePlayerAvatar', [prev_player_data, player_data]);
			}
		}.bind(this));
		Object.each(prev_players_data, function(prev_player_data, prev_player_md5){
			if (undefined == this.players_data[prev_player_md5]) {
				this.fireEvent('removePlayerFromTable', prev_player_data);
			}
		}.bind(this));

		//TODO hacky :(
		//when the table_action is empty , we do want to clear the table, but it should be more seemlessly handled by
		//the sequence of events rather than being so explicit
		if('' == this.hand_data.table_action) { 
			this.table_dom.cleanTable();
			Object.each(this.players_data, function(player_data){
				$(player_data.md5).fade(1);
			});
		}

		if(this.current_table_round != this.hand_data.round) {
			//no previous data for this round. init the hand/table
			this.current_table_round = this.hand_data.round;
			if(true == this.game_meta.is_hand_in_progress) {
				this.fireEvent('initActiveHand');
			}
		} else {
			; //not the first data reception for this round
		}

		var did_player_turn_change = false;
		var prev_active_player_data = undefined;
		var current_active_player_data = undefined;
		Object.every(this.players_data, function(player_data) {
			if (player_data.is_myturn) {
				current_active_player_data = player_data;
				return false;
			}
			return true;
		});
		if (prev_players_data) {
			Object.every(prev_players_data, function(prev_player_data, prev_player_key) {
				if (prev_player_data.is_myturn) {
					prev_active_player_data = prev_player_data;
					did_player_turn_change = this.players_data[prev_player_key].is_myturn != prev_player_data.is_myturn;
					return false;
				}
				return true;
			}.bind(this));
			if (this.betting_round != this.hand_data.game_turn) {
				did_player_turn_change = true;
			}
		} else {
			did_player_turn_change = (current_active_player_data !== undefined);
		} 
		if (did_player_turn_change || was_switch_table_detected) {
			this.fireEvent('playerTurnChange', [prev_active_player_data, current_active_player_data]);
		}

		if (this.game_meta.is_tournament) {
			if (prev_hand_data && 'paused' == prev_hand_data.table_action && 'paused' != this.hand_data.table_action) {
				this.fireEvent('unpauseTable');
			}
			if ('finished' == this.hand_data.table_action) {
				this.fireEvent('finishTournament');
			} else if ('paused' == this.hand_data.table_action) {
				this.fireEvent('pauseTable');
			} else if ('pending' == this.hand_data.table_action) {
				this.fireEvent('pendingTournament');
			} else if ('pending' != this.hand_data.table_action) {
				this.fireEvent('startTournament');
			}
		}
		
		if (undefined == prev_game_meta && 'winner' == this.hand_data.table_action && 5 == this.hand_data.game_turn) {
			this.fireEvent('initOnWinningHand');
		}
		if(true == this.game_meta.is_hand_in_progress) {
			if (this.betting_round != this.hand_data.game_turn) {
				if (this.betting_round < 1 && this.hand_data.game_turn >= 1) {
					this.fireEvent('startFlop');
				}
				if (this.betting_round < 2 && this.hand_data.game_turn >= 2) {
					this.fireEvent('startTurn');
				}
				if (this.betting_round < 3 && this.hand_data.game_turn >= 3) {
					this.fireEvent('startRiver');
				}
				this.betting_round = this.hand_data.game_turn;
				if (this.players_data && this.players_data[this.md5]) {
					this.table_dom.adjustRaiseRange();
					this.table_dom.enableDisableControls();
				}
			}
		} else {
			if (this.hand_data && 'winner' == this.hand_data.table_action) {
				this.fireEvent('endHand');
			}
		} 
	},



	getSeatPlayerInfo: function(chair_index, extra_dialog_message) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=getSeatPlayerInfo';
		var json_data = { "table_id":this.options.table_instance_id, 'chair': chair_index};
		if (undefined != extra_dialog_message) {
			this.seatPlayer_extra_dialog_message = extra_dialog_message;
		} else {
			this.seatPlayer_extra_dialog_message = undefined;
		}

		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	seatPlayer: function(chair_index, buyin, extra_dialog_message) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=seatPlayer';
		var json_data = {'table_id':this.options.table_instance_id, 'chair': chair_index};
		if (undefined != buyin) {
			json_data['buyin'] = buyin;
		}
		if (undefined != extra_dialog_message) {
			this.seatPlayer_extra_dialog_message = extra_dialog_message;
		} else {
			this.seatPlayer_extra_dialog_message = undefined;
		}
		game.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	standupPlayer: function(success_callback){
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=standupPlayer';
		var json_data = {'table_id':this.options.table_instance_id};

		var request = this.communicator.getRequest(url, {"json":JSON.encode(json_data)});
		if (undefined != success_callback) {
			request.addEvent('success', success_callback);
		}
		request.send();
	},


	makePlayerAway: function(){
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=makePlayerAway';
		var json_data = {'table_id':this.options.table_instance_id};
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	rebuyPlayer: function(do_rebuy) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=rebuyPlayer';
		if (! do_rebuy) {
			url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=doNotRebuyPlayer';
		}
		var json_data = { 'table_id':this.options.table_instance_id, 'do_rebuy': do_rebuy};
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send()
	},


	addonPlayer: function() {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=addonPlayer';
		var json_data = {'table_id':this.options.table_instance_id};
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	addPlayerShout: function(message) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=handlePlayerShout';
		var json_data = {'table_id': this.options.table_instance_id, 'msg': message.clean()};

		if (this.communicator.communicator.io.socket.connected) {
			this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
		}
	},


	/**
	 *
	 **/
	sendPlayerAction: function(action, bet_amount, extra_caption, success_callback) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=handlePlayerAction';
		var timestamp = new Date().getTime();
		var is_automated_action = false;

		if ('auto_pass' == action) {
			is_automated_action = true;
			action = 'pass';
		}
		if ('auto_check' == action) {
			is_automated_action = true;
			action = 'check';
		}

		var json_data = {
			"mybet": String(bet_amount).toFloat(),
			"table_id":this.options.table_instance_id,
			"action":action
		};
		if (is_automated_action) {
			json_data.is_auto = 1;
		}
		if (undefined != extra_caption) {
			json_data.extra_caption = extra_caption;
		}

		if (undefined == success_callback) {
			success_callback = function(){;};
		}
		if (this.latest_rtt) {
			json_data.rtt = this.latest_rtt;
			this.latest_rtt = undefined;
		}
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send()
	},


	getTableState: function(){
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=getTableState';

		var timestamp = new Date().getTime();
		var json_data = {
			"table_id":this.options.table_instance_id
		};

		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},




	isTypeNoLimit: function(){
		return 'no_limit' == this.game_meta.table_type.toLowerCase();
	},

	isTypeLimit: function() {
		return 'limit' == this.game_meta.table_type.toLowerCase();
	},

	isTypePotLimit: function() {
		return 'pot_limit' == this.game_meta.table_type.toLowerCase();
	},

		
	playerTimerFinished: function(player_info_id){
		//check if default check/fold action should be invoked
		if (player_info_id == this.md5) {
			var action = 'auto_check';
			if (this.players_data[this.md5].bet2do > 0) {
				action = 'auto_pass';
			}
			this.sendPlayerAction(action, 0);
		}
	},


	handlePlayerTurnChangeEvent: function(prev_active_player_data, new_active_player_data){
		this.table_dom.removeExistingPlayerTimer();
		this.table_div.getElements('.active_player').removeClass('active_player');

		if (new_active_player_data) {
			this.table_dom.addPlayerTimer(new_active_player_data.md5);
			if (new_active_player_data.md5 == this.md5) {
				this.is_my_turn = true;
				this.table_dom.adjustRaiseRange();
				this.table_dom.playSound('my_turn');
				var latest_bet = 0;
				if (this.hand_data.bet[this.betting_round]) {
					latest_bet = this.hand_data.bet[this.betting_round].getLast()[1];
				}
				if ($('btnCall').retrieve('bet_amount') != latest_bet){
					$('btnCall').getElement('input').checked = false;
				}
				var auto_action_input = this.table_div.getElement('.autoUserAction:checked');
				if (auto_action_input) {
					auto_action_input.click();
					auto_action_input.set('checked', '');
				}
			} else {
				this.is_my_turn = false;
			}
		} else {
			//no new_active_player_data. no one is the new active player
			this.is_my_turn = false;
		}
		this.table_dom.enableDisableControls();

		var player_action = '';
		if (prev_active_player_data) {
			if (this.hand_data.bet[this.betting_round]) {
				this.hand_data.bet[this.betting_round].reverse().every(function(bet_data){
					if (bet_data[0] == prev_active_player_data.md5) {
						player_action = bet_data[2];
						return false;
					}
					return true;
				});
				if (! this.hand_data.is_allin && 'check' != player_action) {
					this.table_dom.showLatestPlayerAction(prev_active_player_data.md5, player_action);
				} else {
					this.table_div.getElements('.latest_action.active').removeClass('active').fade('out');
				}
				this.table_dom.showBetsForHand();
			}
		}
	},


	/**
	 * Fired when the player arrives at the table when a winning hand that made it to the
	 * showdown
	 * not an active or in-active table, but in the winning state
	 * so have the display catch up quickly
	 **/ 
	initOnWinningHandEvent: function() {
		this.table_dom.showFlop();
		this.table_dom.showTurn();
		this.table_dom.showRiver();
		this.table_dom.passPocketCards();
	},


	/**
	 * When displaying an active hand:
	 * when a new hand starts or a player joins the table in the middle of an active hand
	 **/
	initActiveHandEvent: function() {
		this.betCounter = [];
		this.betting_round =	0;
		this.table_dom.cleanTable();
		this.table_dom.updateBlindIndicators();
		this.table_dom.displayGameAction(0, _('COM_CAMERONA_HAND_ID'), this.game_meta.gameplay_history_id);
		this.table_dom.showBetsForHand();

		this.table_dom.updateGameInfoBar(this.game_meta, this.hand_data);
		//the game was won so reset the auto user actions so they don't execute at the
		//start of the next round
		this.table_div.getElements('.autoUserAction:checked').each(function(auto_el) {
			auto_el.set('checked', '');
			auto_el.getParent('.btn').removeClass('depressed');
		});


		if (this.players_data[this.md5]) {
			this.getMyCards(this.table_dom.passPocketCards);
		} else {
			this.table_dom.passPocketCards();
		}
		if (this.hand_data.blinds_announce) {
			this.table_dom.displayGameAction(0, _('COM_CAMERONA_GAME_ANNOUNCE'),  this.hand_data.blinds_announce);
		} 
	},


	initialStateReceivedEvent: function(json_obj) {
		if (! json_obj || undefined == json_obj['game_meta']) {
			return false;
		}

		if (json_obj['game_meta'].use_decimals) {
			this.table_dom.options.default_format_options.decimals = 2;
		} else {
			this.table_dom.options.default_format_options.decimals = 0;
		}
		this.table_dom.updateGameInfoBar(json_obj['game_meta'], json_obj['game']);
		this.table_dom.createChairs(json_obj['game_meta'].max_num_players);
		this.table_dom.displayPots();
		this.table_dom.cleanTable();
		if (this.is_user_authorized && 1 == this.game_meta.is_random_seating_required && ! this.is_user_seated) {
			this.getSeatPlayerInfo(0);
		}

		if (undefined == this.clock_skew) {
			var cur_time = new Date();
			this.clock_skew = (json_obj['game_meta'].server_time*1000).toInt() - cur_time.getTime();
		}
		clearInterval(this.game_info_bar_interval);
		this.game_info_bar_interval = this.table_dom.updateInfoBar.periodical(1000, this.table_dom);
		this.options.ready && this.options.ready();
		this.is_state_initialized = true;
	},

	
	playerAuthorizedEvent: function() {
		this.is_user_authorized = true;
		this.table_dom.showSitDownButtons();
	},

	createPopupEvent: function(popup_data){
		this.table_dom.createPopup(popup_data);
	},

	createPopupFromRemoteEvent: function(popup_data){
		this.table_dom.createPopupFromRemote(popup_data);
	},


	communicatorConnectionLostEvent: function() {
		var popup_data = {force_disconnect: true, name: 'connection_lost', allow_close: false, use_mask: true, header_html: 'COM_CAMERONA_BROADCAST_HEADER', body_html: 'COM_CAMERONA_CONNECTION_LOST_BODY'};
		this.table_dom.createPopup(popup_data);
		this.table_dom.cleanTable();
	},

	newMyCardsEvent: function(mycards_data_container){
		var mycards_data = mycards_data_container.cards;
		if (! mycards_data || 0 == mycards_data.length) {
			this.table_dom.passPocketCards();
		} else {
			this.players_data[this.md5].cards = mycards_data;
			this.table_dom.passPocketCards();
		}
	},

	addPlayerToTableEvent: function(player_data){ 
		this.table_dom.createPlayerAvatar(player_data);
		if (player_data.md5 == this.md5) {
			this.is_user_seated = true;
			//always seat 'this' user in a particular seat and move all other players relative to that
			Object.each(this.players_data, function(other_player_data) {
				if (other_player_data.md5 != this.md5 && $(other_player_data.md5)) {
					this.table_dom.movePlayerChair(other_player_data, this.table_dom.translateChairIndex(other_player_data.chair));
				}
			}.bind(this));
			this.table_dom.enableDisableControls();
		}
		if (this.game_meta.is_hand_in_progress) {
			if ('active' != player_data.status.toLowerCase()) {
				$(player_data.md5).fade(0.5);
			}
		}

		var specific_chair = undefined;
		if (player_data.md5 != this.md5) {
			specific_chair = player_data.chair;
		}
		this.table_dom.hideSitDownButtons(specific_chair);
	},


	updatePlayerAvatarEvent: function(prev_player_data, player_data){
		this.table_dom.updatePlayerAvatar(prev_player_data, player_data);
	},


	removePlayerFromTableEvent: function(player_data) {
		this.table_dom.deletePlayer(player_data.md5);
		if (player_data.md5 == this.md5) {
			//deleting 'current' player
			this.is_user_seated = false;
			this.is_my_turn = false;
			//re-adjust everyone back to their 'real' positions now that the 'this' user relative seating
			//has ended (this player standup)
			Object.each(this.players_data, function(other_player_data) {
				if (other_player_data.md5 != this.md5) {
					this.table_dom.movePlayerChair(other_player_data, this.table_dom.translateChairIndex(other_player_data.chair));
				}
			}.bind(this));
			this.table_dom.enableDisableControls();
		}
		if (true === this.is_user_authorized) {
			this.table_dom.showSitDownButtons();
		}
	},


	startFlopEvent: function(){
		this.table_dom.showFlop();
	},


	startTurnEvent: function(){
		this.table_dom.showTurn();
	},


	startRiverEvent: function(){
		this.table_dom.showRiver();
	},


	endHandEvent: function() {
		if (this.game_meta.gameplay_history_id != this.last_winning_gameplay_history_id) {
			//try to ensure showWinner isn't run more than once on a hand
			this.last_winning_gameplay_history_id = this.game_meta.gameplay_history_id;
			this.table_dom.showHandWinner();
		}
		if (this.players_data && this.players_data[this.md5]) {
			this.players_data[this.md5].cards = '';
		}
	},


	startTournamentEvent: function() {
		var dialog = this.table_div.getElement('.tournament_pending_popup');
		if (dialog) {
			clearInterval(dialog.getElement('.modal-body').retrieve('clock_timer'));
			var register_btn = this.table_div.getElement('.register');
			if (register_btn) {
				register_btn.hide();
			}
			dialog.retrieve('popup').destroy();
		}
	},

	finishTournamentEvent: function() {
		var popup_data = {force_disconnect: false, name: 'tournament', allow_close: false, url: this.options.base_url + 'index.php?option=com_camerona&view=tournamentpopup&format=raw&id=' + this.game_meta.tournament_instance_id, use_mask: true};
		this.table_dom.createPopupFromRemote(popup_data);
	},


	pauseTableEvent: function() {
		var popup_data = {force_disconnect: false, name: 'paused', allow_close: false, url: this.options.base_url + 'index.php?option=com_camerona&view=pausedpopup&format=raw&id=' + this.game_meta.tournament_instance_id};
		this.table_dom.createPopupFromRemote(popup_data);
	},


	unpauseTableEvent: function() {
		var paused_dialog = this.table_div.getElement('.paused_dialog');
		paused_dialog && paused_dialog.retrieve('popup').destroy();
	},


	pendingTournamentEvent: function() {
		var popup_data = {force_disconnect: false, name: 'tournament', allow_close: false, url: this.options.base_url + 'index.php?option=com_camerona&view=tournamentpopup&format=raw&id=' + this.game_meta.tournament_instance_id, use_mask: true};
		this.table_dom.createPopupFromRemote(popup_data);
	},


	processNewGameStateEvent: function(table_state) {
		this.handleNewTableState(table_state);
	},


	fetchGeoPositionEvent: function(){
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				this.fetchGeoPositionSuccess.bind(this),
				this.fetchGeoPositionFailure.bind(this),
				{'enableHighAccuracy': true, timeout: 30000}
			);
		} else {
			this.fetchGeoPositionFailure('No geolocation interface available');
		}
	},


	fetchGeoPositionSuccess: function(position_data){
		var json_data = {'position_data': {longitude: position_data.coords.longitude, latitude: position_data.coords.latitude, accuracy: position_data.coords.accuracy}, 'error_data': null};
		this.log('geo position success with data ' + JSON.encode(position_data));
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=recordGeoPollClientResponse';
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	fetchGeoPositionFailure: function(error_data){
		var json_data = {'position_data': null, 'error_data': error_data};
		this.log('geo position failure with data ' + JSON.encode(error_data));
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=recordGeoPollClientResponse';
		this.communicator.getRequest(url, {"json":JSON.encode(json_data)}).send();
	},


	getPlayerGameSetting: function(setting) {
		return getPlayerGameSetting(setting);
	},


	//TODO this should eventually be deleted but a couple places still reference
	//this
	showModal: function(popup_name, use_fade) {
		var dialog_id = 'dialog_' + popup_name;
		if (! $(dialog_id)) {
			var dialog = new Element('div', {'id': dialog_id, 'class': 'modal'});
			if (undefined != use_fade) {
				dialog.addClass('fade');
			}
			this.table_div.grab(dialog);
			dialog.innerHTML = '<div class="modal-header"><a href="#" class="close">x</a><h3></h3></div>';
			dialog.innerHTML += '<div class="modal-body"></div>';
			dialog.innerHTML += '<div class="modal-footer"></div>';
		}
		return $(dialog_id);
	},



	getMyCards: function(success_callback) {
		if (this.is_user_seated && '' == this.players_data[this.md5].cards) {
			this.log('Initiating getMyCards call');
			var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=getMyCards';
			var json_data = {table_id: this.options.table_instance_id};
			var request = this.communicator.getRequest(url, {"json":JSON.encode(json_data)});
			clearTimeout(this.getMyCards_timeout);
			if (null !== this.getMyCards_request) {
				this.getMyCards_request.isRunning() && this.getMyCards_request.cancel();
			}
			request.setOptions({
				onRequest: function(){
					this.getMyCards_timeout = setTimeout(function(){
						if (this.md5 && this.players_data[this.md5] && '' == this.players_data[this.md5].cards) {
							if (this.getMyCards_failures++ < 10) {
								this.log('recalling getMyCards due to timeout. Num failures = ' + this.getMyCards_failures);
								this.getMyCards(success_callback);
							} else {
								this.log('getMyCards hit too many failures. giving up');
							}
						}
					}.bind(this), 1000);
				}.bind(this)});
			this.getMyCards_request = request;
			request.send();
		} else {
			this.log('getMyCards not sending ajax request and just straight to callback');
			success_callback && success_callback.call(this.table_dom);
		}
	},


	/**
	 *  Initiates the switch table action
	 *
	 **/
	switchTable: function (new_table_id) {
		var url = this.options.base_url + 'index.php?option=com_camerona&format=raw&task=switchTable';

		var timestamp = new Date().getTime();
		var json_data = {
			"existing_table_id": this.options.table_instance_id,
			"new_table_id": new_table_id
		};

		this.communicator.getRequest(url, {'json':JSON.encode(json_data)}).send();
	},


	/**
	 *  Called with the table data for the new table
	 *  
	 **/
	switchTableCallback: function(new_table_instance_id ) {
		if (new_table_instance_id != this.options.table_instance_id) {
			var temp_copy = Object.clone(this.players_data);
			Object.each(temp_copy, function(player_data) {
				this.fireEvent('removePlayerFromTable', player_data);
				delete this.players_data[player_data.md5];
			}.bind(this));

			this.is_state_initialized = false;
			this.table_dom.prepareForSwitchTable();
			this.options.table_instance_id = new_table_instance_id;
			this.communicator.switchSubscription(new_table_instance_id);
		}
	},


	getNumRaisesThisTurn: function(){
		var raises_this_turn = 0;
		bets_round = this.hand_data.bet[this.hand_data.game_turn];
		if (0 == this.hand_data.game_turn) {
			raises_this_turn = 1;
		}
		if (bets_round) {
			bets_round.each(function(element, index) {
				if ('RAISE'.toLowerCase() == element[2].substring(0, 'RAISE'.length).toLowerCase() ||
					  'BET'.toLowerCase() == element[2].substring(0, 'BET'.length).toLowerCase()) {
					raises_this_turn++;
				}
			});
		}
		return raises_this_turn;
	},


	getPotSum: function() {
		var pot_sum = 0;
		this.hand_data.pot.each(function(pot_obj){
			pot_sum += pot_obj.total.toFloat();
		});
		return pot_sum.toFloat();
	},


	sendDebugLog: function(){
		var hand_id = this.game_meta ? this.game_meta.gameplay_history_id : null;
		var table_instance_id = this.game_meta ? this.game_meta.table_instance_id : null;
		var data = {msg: 'user submitted', url: '.', line_number: 0, hand_id: hand_id, table_instance_id: this.game_meta.table_instance_id, debug_log: this.debug_log};
		var request = new Request.JSON({
			method: 'post'});
		request.send({
			url: this.options.base_url + 'index.php?option=com_camerona&format=raw&task=recordClientError',
			data:{"json":JSON.encode(data)}});
	}


});

Class.refactor(HoldemGame, {
	fireEvent: function(event_name, event_args) {
		this.log('Event received ' + event_name);
		return this.previous.call(this, event_name, event_args);
	}
});

