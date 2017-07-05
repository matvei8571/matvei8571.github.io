(function (scope, bundled) {
	
	var   enyo     = scope.enyo || (scope.enyo = {})
		, manifest = enyo.__manifest__ || (defineProperty(enyo, '__manifest__', {value: {}}) && enyo.__manifest__)
		, exported = enyo.__exported__ || (defineProperty(enyo, '__exported__', {value: {}}) && enyo.__exported__)
		, require  = enyo.require || (defineProperty(enyo, 'require', {value: enyoRequire}) && enyo.require)
		, local    = bundled()
		, entries;

	// below is where the generated entries list will be assigned if there is one
	entries = null;


	if (local) {
		Object.keys(local).forEach(function (name) {
			var value = local[name];
			if (manifest.hasOwnProperty(name)) {
				if (!value || !(value instanceof Array)) return;
			}
			manifest[name] = value;
		});
	}

	function defineProperty (o, p, d) {
		if (Object.defineProperty) return Object.defineProperty(o, p, d);
		o[p] = d.value;
		return o;
	}
	
	function enyoRequire (target) {
		if (!target || typeof target != 'string') return undefined;
		if (exported.hasOwnProperty(target))      return exported[target];
		var   request = enyo.request
			, entry   = manifest[target]
			, exec
			, map
			, ctx
			, reqs
			, reqr;
		if (!entry) throw new Error('Could not find module "' + target + '"');
		if (!(entry instanceof Array)) {
			if (typeof entry == 'object' && (entry.source || entry.style)) {
				throw new Error('Attempt to require an asynchronous module "' + target + '"');
			} else if (typeof entry == 'string') {
				throw new Error('Attempt to require a bundle entry "' + target + '"');
			} else {
				throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
			}
		}
		exec = entry[0];
		map  = entry[1];
		if (typeof exec != 'function') throw new Error('The shared module manifest has been corrupted, the module is invalid "' + target + '"');
		ctx  = {exports: {}};
		if (request) {
			if (map) {
				reqs = function (name) {
					return request(map.hasOwnProperty(name) ? map[name] : name);
				};
				defineProperty(reqs, 'isRequest', {value: request.isRequest});
			} else reqs = request;
		}
		reqr = !map ? require : function (name) {
			return require(map.hasOwnProperty(name) ? map[name] : name);
		};
		exec(
			ctx,
			ctx.exports,
			scope,
			reqr,
			reqs
		);
		return exported[target] = ctx.exports;
	}

	// in occassions where requests api are being used, below this comment that implementation will
	// be injected
	

	// if there are entries go ahead and execute them
	if (entries && entries.forEach) entries.forEach(function (name) { require(name); });
})(this, function () {
	// this allows us to protect the scope of the modules from the wrapper/env code
	return {'onyx':[function (module,exports,global,require,request){
/**
* Features a variety of commonly used widgets, including toolbars, text inputs, checkboxes, groups
* and multiple types of buttons.
*
* @namespace onyx
*/
module.exports.version = "2.7.0";

var dom = require('enyo/dom');
dom.addBodyClass('onyx');

}],'onyx/Spinner':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Spinner~Spinner} kind.
* @module onyx/Spinner
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Spinner~Spinner} is a control that displays a spinning animation to indicate
* that activity is taking place. By default, a light spinner, suitable for
* displaying against a dark background, is shown. To get a dark spinner
* (suitable for use on a lighter background), apply the `'onyx-light'` CSS class:
*
* ```
* var
* 	Spinner = require('onyx/Spinner');
*
* {kind: Spinner, classes: 'onyx-light'}
* ```
*
* Typically, a spinner is shown to indicate activity and hidden to indicate
* that the activity has ended. The spinning animation will automatically start
* when the spinner is shown. If you wish, you may control the animation directly
* by calling the [start()]{@link module:onyx/Spinner~Spinner#start}, [stop()]{@link module:onyx/Spinner~Spinner#stop},
* and [toggle()]{@link module:onyx/Spinner~Spinner#toggle} methods.
*
* @class Spinner
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Spinner~Spinner.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Spinner',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-spinner',

	/**
	* Stops the spinner animation.
	*
	* @public
	*/
	stop: function () {
		this.setShowing(false);
	},

	/**
	* Starts the spinner animation.
	*
	* @public
	*/
	start: function () {
		this.setShowing(true);
	},

	/**
	* Toggles the spinner animation on or off.
	*
	* @public
	*/
	toggle: function () {
		this.setShowing(!this.getShowing());
	}
});

}],'onyx/Icon':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Icon~Icon} kind.
* @module onyx/Icon
*/

var
	kind = require('enyo/kind'),
	path = require('enyo/path'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Icon~Icon} is a control that displays an icon. To set the icon image,
* specify a URL for the image's location in the Icon's [src]{@link module:onyx/Icon~Icon#src}
* property.
*
* In Onyx, icons have a size of 32x32 pixels. Since the icon image is applied
* as a CSS background, the height and width of the icon must be set if an image
* of a different size is used.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Icon = require('onyx/Icon');
*
* 	{kind: Icon, src: 'onyx/src/assets/search.png'}
* ```
*
* When an icon should act like a button, use an {@link module:onyx/IconButton~IconButton}.
*
* @class Icon
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Icon~Icon.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Icon',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-icon',

	/**
	* @lends module:onyx/Icon~Icon.prototype
	* @private
	*/
	published: {
		/**
		* URL specifying path to icon image.
		* @type {String}
		* @default  ''
		* @public
		*/
		src: '',

		/**
		* If `true`, icon is shown as disabled.
		* @type {Boolean}
		* @default  false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	srcChanged: function () {
		this.applyStyle('background-image', 'url(' + path.rewrite(this.src) + ')');
	}
});

}],'onyx/Grabber':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Grabber~Grabber} kind.
* @module onyx/Grabber
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Grabber~Grabber} is a control styled to indicate that an object may be grabbed
* and moved. It should only be used in this limited context--to indicate that
* dragging an object will result in movement.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('onyx/Button'),
* 		Grabber = require('onyx/Grabber'),
* 		Toolbar = require('onyx/Toolbar');
*
* 	{kind: Toolbar, components: [
* 		{kind: Grabber, ondragstart: 'grabberDragstart',
* 			ondrag: 'grabberDrag', ondragfinish: 'grabberDragFinish'},
* 		{kind: Button, content: 'More stuff'}
* 	]}
* ```
*
* When using a Grabber inside a [Fittable]{@link module:layout/FittableLayout~FittableLayout} control,
* be sure to set `'noStretch: true'` on the Fittable, or else give it an explicit
* height. Otherwise, the Grabber may not be visible.
*
* @class Grabber
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Grabber~Grabber.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Grabber',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-grabber'
});

}],'onyx/ToggleButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ToggleButton~ToggleButton} kind.
* @module onyx/ToggleButton
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* Fires when the user changes the value of the toggle button, but not
* when the value is changed programmatically.
*
* @event module:onyx/ToggleButton~ToggleButton#onChange
* @type {Object}
* @property {Boolean} value - Current value of the button.
* @public
*/

/**
* {@link module:onyx/ToggleButton~ToggleButton} is a control that looks like a switch with labels for
* two states. Each time a	ToggleButton is tapped, it switches its value and fires
* an [onChange]{@link module:onyx/ToggleButton~ToggleButton#onChange} event.
*
* @ui
* @class ToggleButton
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ToggleButton~ToggleButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ToggleButton',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toggle-button',

	/**
	* @lends module:onyx/ToggleButton~ToggleButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the ToggleButton is part of an {@link module:enyo/Group~Group}. A value
		* of `true` indicates that this is the active button of the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Indicates whether toggle button is currently in the `'on'` state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false,

		/**
		* Label for the `'on'` state.
		*
		* @type {String}
		* @default 'On'
		* @public
		*/
		onContent: 'On',

		/**
		* Label for the `'off'` state.
		*
		* @type {String}
		* @default 'Off'
		* @public
		*/
		offContent: 'Off',

		/**
		* If `true`, toggle button cannot be tapped and thus will not generate any
		* events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish'
	},

	/**
	* @private
	*/
	components: [
		{name: 'contentOn', classes: 'onyx-toggle-content on'},
		{name: 'contentOff', classes: 'onyx-toggle-content off'},
		{classes: 'onyx-toggle-button-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.value = Boolean(this.value || this.active);
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.updateVisualState();
	},

	/**
	* @private
	*/
	updateVisualState: function () {
		this.addRemoveClass('off', !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},

	/**
	* @fires module:onyx/ToggleButton~ToggleButton#onChange
	* @private
	*/
	valueChanged: function () {
		this.updateVisualState();
		this.doChange({value: this.value});
	},

	/**
	* @private
	*/
	activeChanged: function () {
		this.setValue(this.active);
		this.bubble('onActivate');
	},

	/**
	* @private
	*/
	onContentChanged: function () {
		this.$.contentOn.setContent(this.onContent || '');
		this.$.contentOn.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	offContentChanged: function () {
		this.$.contentOff.setContent(this.offContent || '');
		this.$.contentOff.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	updateValue: function (value) {
		if (!this.disabled) {
			this.setValue(value);
		}
	},

	/**
	* Programmatically simulates a user tap of the toggle button.
	*
	* @public
	*/
	tap: function () {
		this.updateValue(!this.value);
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (event.horizontal) {
			event.preventDefault();
			this.dragging = true;
			this.dragged = false;
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var d = event.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		if (this.dragged) {
			event.preventTap();
		}
	}
});

}],'onyx/Toolbar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Toolbar~Toolbar} kind.
* @module onyx/Toolbar
*/

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Toolbar~Toolbar} is a horizontal bar containing controls used to perform
* common UI actions.
*
* A toolbar customizes the styling of the controls it hosts, including buttons,
* icons, and inputs.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	IconButton = require('onyx/IconButton'),
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	Toolbar = require('onyx/Toolbar');
*
*	{kind: Toolbar, components: [
*		{kind: Button, content: 'Favorites'},
*		{kind: InputDecorator, components: [
*			{kind: Input, placeholder: 'Enter a search term...'}
*		]},
*		{kind: IconButton, src: 'onyx/src/assets/go.png'}
*	]}
* ```
*
* @class Toolbar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Toolbar~Toolbar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Toolbar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx onyx-toolbar onyx-toolbar-inline',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		//workaround for android 4.0.3 rendering glitch (ENYO-674)
		if (this.hasClass('onyx-menu-toolbar') && (platform.android >= 4)) {
			this.applyStyle('position', 'static');
		}
	}
});

}],'onyx/ProgressBar':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ProgressBar~ProgressBar} kind.
* @module onyx/ProgressBar
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator'),
	Control = require('enyo/Control');

/**
* Fires when progress bar finishes animating to a position.
*
* @event module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
* @type {module:enyo/Animator~Animator}
* @todo Not sure why the animator is passed as the payload to the event ...
* @public
*/

/**
* {@link module:onyx/ProgressBar~ProgressBar} is a control that shows the current progress of a
* process in a horizontal bar.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, progress: 10}
* ```
*
* To animate a progress change, call the
* [animateProgressTo()]{@link module:onyx/ProgressBar~ProgressBar#animateProgressTo} method:
*
* ```javascript
* 	this.$.progressBar.animateProgressTo(50);
* ```
*
* You may customize the color of the bar by applying a style via the
* [barClasses]{@link module:onyx/ProgressBar~ProgressBar#barClasses} property, e.g.:
*
* ```
* 	var
* 		kind = require('enyo/kind'),
* 		ProgressBar = require('onyx/ProgressBar');
*
* 	{kind: ProgressBar, barClasses: 'onyx-dark'}
* ```
*
* @class ProgressBar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ProgressBar~ProgressBar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ProgressBar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-progress-bar',

	/**
	* @lends module:onyx/ProgressBar~ProgressBar.prototype
	* @private
	*/
	published: {
		/**
		* Current position of progress bar.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		progress: 0,

		/**
		* Minimum progress value (i.e., no progress made).
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		min: 0,

		/**
		* Maximum progress value (i.e., process complete).
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		max: 100,

		/**
		* CSS classes to apply to progress bar.
		*
		* @type {String}
		* @default  ''
		* @public
		*/
		barClasses: '',

		/**
		* When `true`, stripes are shown in progress bar.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		showStripes: true,

		/**
		* If `true` (and [showStripes]{@link module:onyx/ProgressBar~ProgressBar#showStripes} is `true`),
		* stripes shown in progress bar are animated.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		animateStripes: true,

		/**
		* Sliders may be "snapped to" multiples of this value in either direction.
		*
		* @type {Number}
		* @default  0
		* @public
		* @todo  This doesn't appear to be supported. Only referenced by a method which
		* 	itself isn't called by anthing
		*/
		increment: 0
	},

	/**
	* @private
	*/
	events: {
		onAnimateProgressFinish: ''
	},

	/**
	* @private
	*/
	components: [
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', classes: 'onyx-progress-bar-bar'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.progressChanged();
		this.barClassesChanged();
		this.showStripesChanged();
		this.animateStripesChanged();
	},

	/**
	* @private
	*/
	barClassesChanged: function (old) {
		this.$.bar.removeClass(old);
		this.$.bar.addClass(this.barClasses);
	},

	/**
	* @private
	*/
	showStripesChanged: function () {
		this.$.bar.addRemoveClass('striped', this.showStripes);
	},

	/**
	* @private
	*/
	animateStripesChanged: function () {
		this.$.bar.addRemoveClass('animated', this.animateStripes);
	},

	/**
	* @private
	*/
	progressChanged: function () {
		this.progress = this.clampValue(this.min, this.max, this.progress);
		var p = this.calcPercent(this.progress);
		this.updateBarPosition(p);
	},

	/**
	* Clamps a specified value to the nearest [increment]{@link module:onyx/ProgressBar~ProgressBar#increment}
	* value.
	*
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	calcIncrement: function (value) {
		return (Math.round(value / this.increment) * this.increment);
	},

	/**
	* Ensures that passed-in value is between the specified minimum and maximum.
	*
	* @param  {Number} min   - Minimum value.
	* @param  {Number} max   - Maximum value.
	* @param  {Number} value - The value to clamp.
	* @return {Number}         - The clamped value.
	* @private
	*/
	clampValue: function (min, max, value) {
		return Math.max(min, Math.min(value, max));
	},

	/**
	* Calculates the completion ratio.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion ratio (between `0` and `1`).
	* @private
	*/
	calcRatio: function (value) {
		return (value - this.min) / (this.max - this.min);
	},

	/**
	* Calculates the completion percentage.
	*
	* @param  {Number} value - Value between `min` and `max`.
	* @return {Number}         - Completion percentage (between `0` and `100`).
	* @private
	*/
	calcPercent: function (value) {
		return this.calcRatio(value) * 100;
	},

	/**
	* Positions the progress bar at specified completion percentage.
	*
	* @param  {Number} percent - Completion percentage corresponding to desired position.
	* @private
	*/
	updateBarPosition: function (percent) {
		this.$.bar.applyStyle('width', percent + '%');
	},

	/**
	* Animates progress to the given value.
	*
	* @param  {Number} value - The desired value. Will be clamped between
	* 	[min]{@link module:onyx/ProgressBar~ProgressBar#min} and [max]{@link module:onyx/ProgressBar~ProgressBar#max}.
	* @public
	*/
	animateProgressTo: function (value) {
		this.$.progressAnimator.play({
			startValue: this.progress,
			endValue: value,
			node: this.hasNode()
		});
	},

	/**
	* Handles [onStep]{@link module:enyo/Animator~Animator#onStep} animation events.
	*
	* @private
	*/
	progressAnimatorStep: function (sender) {
		this.setProgress(sender.value);
		return true;
	},

	/**
	* Handles [onEnd]{@link module:enyo/Animator~Animator#onEnd} animation events.
	*
	* @fires module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish
	* @private
	*/
	progressAnimatorComplete: function (sender) {
		this.doAnimateProgressFinish(sender);
		return true;
	}
});

}],'onyx/IconButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/IconButton~IconButton} kind.
* @module onyx/IconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('onyx/Icon');

/**
* {@link module:onyx/IconButton~IconButton} is an {@link module:onyx/Icon~Icon} that acts like a button. The
* icon image is specified by setting the [src]{@link module:onyx/Icon~Icon#src} property
* to a URL.
*
* If you want to combine an icon with text inside a button, use an
* {@link module:onyx/Icon~Icon} inside an {@link module:onyx/Button~Button}.
*
* The image associated with the `src` property of the IconButton is assumed to
* be a 32x64-pixel strip, with the top half showing the button's normal state
* and the bottom half showing its state when hovered-over or active.
*
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class IconButton
* @extends module:onyx/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/IconButton~IconButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.IconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @lends module:onyx/IconButton~IconButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the IconButton is part of an {@link module:enyo/Group~Group}; a value
		* of `true` indicates that this is the active button of the group.
		*
		* @type {Boolean}
		* @default  false
		* @public
		*/
		active: false
	},

	/**
	* @private
	*/
	classes: 'onyx-icon-button',

	/**
	* @private
	*/
	handlers: {
		ondown: 'down',
		onenter: 'enter',
		ondragfinish: 'dragfinish',
		onleave: 'leave',
		onup: 'up'
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.activeChanged();
	},

	/**
	* Makes the control [active]{@link module:onyx/IconButton~IconButton#active} (if it is not
	* [disabled]{@link module:onyx/Icon~Icon#disabled}).
	*
	* @private
	*/
	tap: function () {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.addClass('pressed');
		this._isPressed = true;
	},

	/**
	* @private
	*/
	enter: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		if(this._isPressed) {
			this.addClass('pressed');
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @private
	*/
	leave: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	up: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @fires module:enyo/GroupItem~GroupItem#onActivate
	* @private
	*/
	activeChanged: function () {
		this.bubble('onActivate');
	}
});

}],'onyx/Input':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Input~Input} kind.
* @module onyx/Input
*/

var
	kind = require('enyo/kind'),
	Input = require('enyo/Input');

/**
* {@link module:onyx/Input~Input} is an Onyx-styled input control, derived from {@link module:enyo/Input~Input}.
* Typically, an `onyx/Input` is placed inside an {@link module:onyx/InputDecorator~InputDecorator}, which
* provides styling, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input, placeholder: 'Enter some text...', onchange: 'inputChange'}
* 	]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class Input
* @extends module:enyo/Input~Input
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Input~Input.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'onyx-input'
});

}],'onyx/Drawer':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Drawer~Drawer} kind.
* @module onyx/Drawer
*/

var
	kind = require('enyo/kind'),
	Drawer = require('enyo/Drawer');

/**
* {@link module:onyx/Drawer~Drawer} is now an empty kind derived from {@link module:enyo/Drawer~Drawer}.
* All of its functionality has been moved into the latter kind.
*
* For more information, see the documentation on
* [Drawers]{@linkplain $dev-guide/building-apps/layout/drawers.html} in the
* Enyo Developer Guide.
*
* @class Drawer
* @extends module:enyo/Drawer~Drawer
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Drawer~Drawer.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Drawer',

	/**
	* @private
	*/
	kind: Drawer
});

}],'onyx/Slider':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Slider~Slider} kind.
* @module onyx/Slider
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator');

var
	ProgressBar = require('onyx/ProgressBar');

/**
* Fires when bar position is set.
*
* @event module:onyx/Slider~Slider#onChange
* @type {Object}
* @property {Number} value - The new bar position.
* @public
*/

/**
* Fires while control knob is being dragged.
*
* @event module:onyx/Slider~Slider#onChanging
* @type {Object}
* @property {Number} value - The current bar position.
* @public
*/

/**
* Fires when animation to a position finishes.
*
* @event module:onyx/Slider~Slider#onAnimateFinish
* @type {module:enyo/Animator~Animator}
* @public
* @todo  Animator as the payload; overlap with
* 	{@link module:onyx/ProgressBar~ProgressBar#onAnimateProgressFinish}
*/

/**
* {@link module:onyx/Slider~Slider} is a control that presents a range of selection options
* in the form of a horizontal slider with a control knob. The knob may be
* tapped and dragged to the desired location.
*
* ```
* var
* 	Slider = require('onyx.Slider');
*
* {kind: Slider, value: 30}
* ```
*
* [onChanging]{@link module:onyx/Slider~Slider#onChanging} events are fired while the
* control knob is being dragged, and an [onChange]{@link module:onyx/Slider~Slider#onChange}
* event is fired when the position is set, either by finishing a drag or by tapping
* the bar.
*
* @class Slider
* @extends module:onyx/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Slider~Slider.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Slider',

	/**
	* @private
	*/
	kind: ProgressBar,

	/**
	* @private
	*/
	classes: 'onyx-slider',

	/**
	* @lends module:onyx/Slider~Slider.prototype
	* @private
	*/
	published: {
		/**
		* Position of slider, expressed as an integer between `0` and `100`, inclusive.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		value: 0,

		/**
		* When `true`, current progress will be styled differently from rest of bar.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		lockBar: true,

		/**
		* When `true`, tapping on bar will change current position.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		tappable: true
	},

	/**
	* @private
	*/
	events: {
		onChange: '',
		onChanging: '',
		onAnimateFinish: ''
	},

	/**
	* If `true`, stripes are shown in the slider bar.
	*
	* @type {Boolean}
	* @default  false
	* @public
	*/
	showStripes: false,

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish'
	},

	/**
	* @private
	*/
	moreComponents: [
		{kind: Animator, onStep: 'animatorStep', onEnd: 'animatorComplete'},
		{classes: 'onyx-slider-taparea'},
		{name: 'knob', classes: 'onyx-slider-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		ProgressBar.prototype.create.apply(this, arguments);

		// add handlers for up/down events on knob for pressed state (workaround for inconsistent (timing-wise) active:hover styling)
		this.moreComponents[2].ondown = 'knobDown';
		this.moreComponents[2].onup = 'knobUp';

		this.createComponents(this.moreComponents);
		this.valueChanged();
	},

	/**
	* @private
	*/
	valueChanged: function () {
		this.value = this.clampValue(this.min, this.max, this.value);
		if (!this.$.animator.isAnimating()) {
			this.updateBar(this.value);
		}
	},

	/**
	* @private
	*/
	updateBar: function (value) {
		var p = this.calcPercent(value);
		this.updateKnobPosition(p);
		if (this.lockBar) {
			this.setProgress(value);
		}
	},

	/**
	* @private
	*/
	updateKnobPosition: function (percent) {
		this.$.knob.applyStyle('left', percent + '%');
	},

	/**
	* @private
	*/
	calcKnobPosition: function (event) {
		var x = event.clientX - this.hasNode().getBoundingClientRect().left;
		return (x / this.getBounds().width) * (this.max - this.min) + this.min;
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (event.horizontal) {
			event.preventDefault();
			this.dragging = true;
			sender.addClass('pressed');
			return true;
		}
	},

	/**
	* @fires module:onyx/Slider~Slider#onChanging
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var v = this.calcKnobPosition(event);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.setValue(this.clampValue(this.min, this.max, v));
			this.doChanging({value: this.value});
			return true;
		}
	},

	/**
	* @fires module:onyx/Slider~Slider#onChange
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		event.preventTap();
		this.doChange({value: this.value});
		sender.removeClass('pressed');
		return true;
	},

	/**
	* @private
	*/
	tap: function (sender, event) {
		if (this.tappable) {
			var v = this.calcKnobPosition(event);
			v = (this.increment) ? this.calcIncrement(v) : v;
			this.tapped = true;
			this.animateTo(v);
			return true;
		}
	},

	/**
	* @private
	*/
	knobDown: function (sender, event) {
		this.$.knob.addClass('pressed');
	},

	/**
	* @private
	*/
	knobUp: function (sender, event) {
		this.$.knob.removeClass('pressed');
	},

	/**
	* Animates to the given value.
	*
	* @param  {Number} value - The value to animate to.
	* @public
	* @todo  functional overlap with {@link module:onyx/ProgressBar~ProgressBar#animateProgressTo}
	*/
	animateTo: function (value) {
		this.$.animator.play({
			startValue: this.value,
			endValue: value,
			node: this.hasNode()
		});

		this.setValue(value);
	},

	/**
	* @private
	*/
	animatorStep: function (sender) {
		this.updateBar(sender.value);
		return true;
	},

	/**
	* @fires module:onyx/Slider~Slider#onChange
	* @fires module:onyx/Slider~Slider#onAnimateFinish
	* @private
	*/
	animatorComplete: function (sender) {
		if (this.tapped) {
			this.tapped = false;
			this.doChange({value: this.value});
		}
		this.doAnimateFinish(sender);
		return true;
	}
});

}],'onyx/Popup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Popup~Popup} kind.
* @module onyx/Popup
*/

var
	kind = require('enyo/kind'),
	Popup = require('enyo/Popup');

/**
* {@link module:onyx/Popup~Popup} is an {@link module:enyo/Popup~Popup} with Onyx styling applied.
*
* For more information, see the documentation on
* [Popups]{@linkplain $dev-guide/building-apps/controls/popups.html} in the
* Enyo Developer Guide.
*
* @class Popup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Popup~Popup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Popup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-popup'
});

}],'onyx/InputDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/InputDecorator~InputDecorator} kind.
* @module onyx/InputDecorator
*/

var
	kind = require('enyo/kind'),
	ToolDecorator = require('enyo/ToolDecorator');

/**
* {@link module:onyx/InputDecorator~InputDecorator} is a control that provides input styling. Any
* controls in the InputDecorator will appear to be inside an area styled as an
* input. Usually, an InputDecorator surrounds an {@link module:onyx/Input~Input}.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: Input}
* 	]}
* ```
*
* Other controls, such as buttons, may be placed to the right or left of the
* input control, e.g.:
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		IconButton = require('onyx/IconButton'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, components: [
* 		{kind: IconButton, src: 'onyx/assets/search.png'},
* 		{kind: Input},
* 		{kind: IconButton, src: 'onyx/assets/cancel.png'}
* 	]}
* ```
*
* Note that the InputDecorator fits around the content inside it. If the
* decorator is sized, then its contents will likely need to be sized as well.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Input = require('onyx/Input'),
* 		InputDecorator = require('onyx/InputDecorator');
*
* 	{kind: InputDecorator, style: 'width: 500px;', components: [
* 		{kind: Input, style: 'width: 100%;'}
* 	]}
* ```
*
* @class InputDecorator
* @extends module:enyo/ToolDecorator~ToolDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/InputDecorator~InputDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.InputDecorator',

	/**
	* @private
	*/
	kind: ToolDecorator,

	/**
	* @private
	*/
	tag: 'label',

	/**
	* @private
	*/
	classes: 'onyx-input-decorator',

	/**
	* @lends module:onyx/InputDecorator~InputDecorator.prototype
	* @private
	*/
	published: {
		/**
		* If set to `true`, the input will look focused, even when it doesn't
		* actually have focus.
		* @type {Boolean}
		* @default  false
		* @public
		*/
		alwaysLooksFocused: false
	},

	/**
	* @private
	*/
	handlers: {
		onDisabledChange: 'disabledChange',
		onfocus: 'receiveFocus',
		onblur: 'receiveBlur'
	},

	/**
	* @private
	*/
	create: function () {
		ToolDecorator.prototype.create.apply(this, arguments);
		this.updateFocus(false);
	},

	/**
	* @private
	*/
	alwaysLooksFocusedChanged: function (oldValue) {
		this.updateFocus(this.focus);
	},

	/**
	* Updates the focus state of the control unless
	* [alwaysLooksFocused]{@link module:onyx/InputDecorator~InputDecorator#alwaysLooksFocused} is `true`.
	*
	* @param  {Boolean} focus - The requested focus state.
	* @private
	*/
	updateFocus: function (focus) {
		this.focused = focus;
		this.addRemoveClass('onyx-focused', this.alwaysLooksFocused || this.focused);
	},

	/**
	* Handles `onfocus` events triggered by child components.
	*
	* @private
	*/
	receiveFocus: function () {
		this.updateFocus(true);
	},

	/**
	* Handles `onblur` events triggered by child components.
	*
	* @private
	*/
	receiveBlur: function () {
		this.updateFocus(false);
	},

	/**
	* Handles `onDisabledChange` events triggered by child components.
	*
	* @private
	*/
	disabledChange: function (sender, event) {
		this.addRemoveClass('onyx-disabled', event.originator.disabled);
	}
});

}],'onyx/Checkbox':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Checkbox~Checkbox} kind.
* @module onyx/Checkbox
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Checkbox = require('enyo/Checkbox');

/**
* {@link module:onyx/Checkbox~Checkbox} is a box that shows or hides a checkmark when clicked. The
* [onActivate]{@link module:enyo/Checkbox~Checkbox#onActivate} event is fired when the box is clicked.
* Call `getValue()` to retrieve a boolean indicating whether the box is currently
* checked.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Checkbox = require('onyx/Checkbox');
*
* 	{kind: Checkbox, onchange: 'checkboxClicked'},
*
* 	checkboxClicked: function (sender) {
* 		if (sender.getValue()) {
* 			this.log('Someone checked me!');
* 		}
* 	}
* ```
*
* @class Checkbox
* @extends module:enyo/Checkbox~Checkbox
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Checkbox~Checkbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Checkbox',

	/**
	* @private
	*/
	classes: 'onyx-checkbox',

	/**
	* @private
	*/
	kind: Checkbox,

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	tap: function (sender, e) {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble('onchange');
		}
		return !this.disabled;
	},

	/**
	* Overrides {@link module:enyo/Input~Input} `dragstart` handler, to allow drags to propagate
	* for Checkbox.
	*
	* @private
	*/
	dragstart: utils.nop
});

}],'onyx/TextArea':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TextArea~TextArea} kind.
* @module onyx/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:onyx/TextArea~TextArea} is an Onyx-styled TextArea control, derived from
* {@link module:enyo/TextArea~TextArea}. Typically, an `onyx/TextArea` is placed inside an
* {@link module:onyx/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var
* 	InputDecorator = require('onyx/InputDecorator'),
* 	TextArea = require('onyx/TextArea');
*
* {kind: InputDecorator, components: [
* 	{kind: TextArea, onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class TextArea
* @extends module:enyo/TextArea~TextArea
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'onyx-textarea'
});

}],'onyx/Tooltip':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Tooltip~Tooltip} kind.
* @module onyx/Tooltip
*/

var
	kind = require('enyo/kind');

var
	Popup = require('onyx/Popup');

/**
* {@link module:onyx/Tooltip~Tooltip} is a subkind of {@link module:onyx/Popup~Popup} that works in
* conjunction with an {@link module:onyx/TooltipDecorator~TooltipDecorator}. It automatically displays
* a tooltip when the user hovers over the decorator. The tooltip is positioned
* around the decorator where there is available window space.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
*	{kind: TooltipDecorator, components: [
*		{kind: Button, content: 'Tooltip'},
*		{kind: Tooltip, content: 'I am a tooltip for a button.'}
*	]}
* ```
*
* You may also force a tooltip to be displayed by calling its `show()` method.
*
* @class Tooltip
* @extends module:onyx/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Tooltip~Tooltip.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Tooltip',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-tooltip below left-arrow',

	/**
	* If `true`, the tooltip is automatically dismissed when user stops hovering
	* over the decorator.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoDismiss: false,

	/**
	* Hovering over the decorator for this length of time (in milliseconds)
	* causes the tooltip to appear.
	*
	* @type {Number}
	* @default 500
	* @public
	*/
	showDelay: 500,

	/**
	* Default `'margin-left'` value.
	*
	* @type {Number}
	* @default -6
	* @public
	*/
	defaultLeft: -6,

	/**
	* @private
	*/
	handlers: {
		onRequestShowTooltip: 'requestShow',
		onRequestHideTooltip: 'requestHide'
	},

	/**
	* @private
	*/
	requestShow: function () {
		this.showJob = setTimeout(this.bindSafely('show'), this.showDelay);
		return true;
	},

	/**
	* @private
	*/
	cancelShow: function () {
		clearTimeout(this.showJob);
	},

	/**
	* @private
	*/
	requestHide: function () {
		this.cancelShow();
		return Popup.prototype.requestHide.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.cancelShow();
		this.adjustPosition(true);
		Popup.prototype.showingChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	applyPosition: function (inRect) {
		var s = '';
		for (var n in inRect) {
			s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* @private
	*/
	adjustPosition: function (belowActivator) {
		if (this.showing && this.hasNode()) {
			var b = this.node.getBoundingClientRect();

			//when the tooltip bottom goes below the window height move it above the decorator
			if (b.top + b.height > window.innerHeight) {
				this.addRemoveClass('below', false);
				this.addRemoveClass('above', true);
			} else {
				this.addRemoveClass('above', false);
				this.addRemoveClass('below', true);
			}

			// when the tooltip's right edge is out of the window, align its right edge with the decorator left
			// edge (approx)
			if (b.left + b.width > window.innerWidth){
				this.applyPosition({'margin-left': -b.width, bottom: 'auto'});
				//use the right-arrow
				this.addRemoveClass('left-arrow', false);
				this.addRemoveClass('right-arrow', true);
			}
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		//reset the tooltip to align its left edge with the decorator
		this.applyPosition({'margin-left': this.defaultLeft, bottom: 'auto'});
		this.addRemoveClass('left-arrow', true);
		this.addRemoveClass('right-arrow', false);

		this.adjustPosition(true);
		Popup.prototype.handleResize.apply(this, arguments);
	}
});

}],'onyx/Button':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Button~Button} kind.
* @module onyx/Button
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link module:onyx/Button~Button} is an {@link module:enyo/Button~Button} with Onyx styling applied. The
* color of the button may be customized by specifying a background color.
*
* The `'onyx-affirmative'`, `'onyx-negative'`, and `'onyx-blue'` classes provide
* some built-in presets.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Button = require('onyx/Button');
*
* 	{kind: Button, content: 'Button'},
* 	{kind: Button, content: 'Affirmative', classes: 'onyx-affirmative'},
* 	{kind: Button, content: 'Negative', classes: 'onyx-negative'},
* 	{kind: Button, content: 'Blue', classes: 'onyx-blue'},
* 	{kind: Button, content: 'Custom', style: 'background-color: purple; color: #F1F1F1;'}
* ```
* For more information, see the documentation on
* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
* Enyo Developer Guide.
*
* @class Button
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Button~Button.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Button',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'onyx-button enyo-unselectable',

	/**
	* @private
	*/
	handlers: {
		ondown: 'down',
		onenter: 'enter',
		ondragfinish: 'dragfinish',
		onleave: 'leave',
		onup: 'up'
	},

	/**
	* @private
	*/
	down: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.addClass('pressed');
		this._isPressed = true;
	},

	/**
	* @private
	*/
	enter: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		if(this._isPressed) {
			this.addClass('pressed');
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	},

	/**
	* @private
	*/
	leave: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
	},

	/**
	* @private
	*/
	up: function (sender, event) {
		if (this.disabled) {
			return true;
		}
		this.removeClass('pressed');
		this._isPressed = false;
	}
});

}],'onyx/RadioButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioButton~RadioButton} kind.
* @module onyx/RadioButton
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link module:onyx/RadioButton~RadioButton} is a radio button designed for use within an
* {@link module:onyx/RadioGroup~RadioGroup}.
*
* @class RadioButton
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioButton~RadioButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'onyx-radiobutton'
});

}],'onyx/MenuItem':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuItem~MenuItem} kind.
* @module onyx/MenuItem
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* Fires when the menu item is selected.
*
* @event module:onyx/MenuItem~MenuItem#onSelect
* @type {Object}
* @property {module:enyo/Control~Control} selected - The selected menu item.
* @property {String} content - The selected menu item's content.
* @public
*/

/**
* Fires when the menu item's content changes.
*
* @event module:onyx/MenuItem~MenuItem#onItemContentChange
* @type {Object}
* @property {module:enyo/Control~Control} content - The menu item's content.
* @public
*/

/**
* {@link module:onyx/MenuItem~MenuItem} is a button styled to look like a menu
* item, designed for use in an {@link module:onyx/Menu~Menu}. When a component
* is created inside of a Menu, it will be a MenuItem by default.
*
* When a MenuItem is tapped, it tells the menu to hide itself and emits an
* [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with its
* content and a reference to itself. This event and its properties may be
* handled by a client application to determine which MenuItem was selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind');
*
* 	var
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	module.exports = kind(
* 		name: 'onyx.MenuItemExample',
* 		handlers: {
* 			onSelect: 'itemSelected'
* 		},
* 		components: [
* 			{kind: MenuDecorator, components: [
* 				{content: 'Open Menu (floating)'},
* 				{kind: Menu, floating: true, components: [
* 					{content: '1'},
* 					{content: '2'},
* 					{classes: 'onyx-menu-divider'},
* 					{content: 'Label', classes: 'onyx-menu-label'},
* 					{content: '3'},
* 				]}
* 			]}
* 		],
* 		itemSelected: function (sender, event) {
* 			enyo.log('Menu Item Selected: ' + event.originator.content);
* 		}
* 	)
* ```
*
* @class MenuItem
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuItem~MenuItem.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuItem',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	events: {
		onSelect: '',
		onItemContentChange: ''
	},

	/**
	* @private
	*/
	classes: 'onyx-menu-item',

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	create: function () {
		this.silence();
		Button.prototype.create.apply(this, arguments);
		this.unsilence();
		if (this.active){
			this.bubble('onActivate');
		}
	},

	/**
	* Handles `ontap` events.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @fires module:onyx/MenuItem~MenuItem#onSelect
	* @private
	*/
	tap: function (sender) {
		Button.prototype.tap.apply(this, arguments);
		this.bubble('onRequestHideMenu');
		this.doSelect({selected:this, content:this.content});
	},

	/**
	* Sends notification that the item's content has changed.
	*
	* @fires module:onyx/MenuItem~MenuItem#onItemContentChange
	* @private
	*/
	contentChanged: function (old) {
		Button.prototype.contentChanged.apply(this, arguments);
		this.doItemContentChange({content: this.content});
	}
});

}],'onyx/ContextualPopup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ContextualPopup~ContextualPopup} kind.
* @module onyx/ContextualPopup
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Popup = require('enyo/Popup'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	Button = require('onyx/Button');

/**
* Fires when the popup is tapped.
* @todo  Should this be removed? Never triggered and duplicate of ontap
* @event module:onyx/ContextualPopup~ContextualPopup#onTap
* @public
*/

/**
* {@link module:onyx/ContextualPopup~ContextualPopup} is a subkind of {@link module:enyo/Popup~Popup}. Contextual
* popups serve as child windows that appear near the point of initiation. Use
* them to prompt users to make a selection from a defined set of options; to
* conduct other quick, single-step interactions in which context should be
* maintained; and to present simple views, such as previews.
*
* A contextual popup is meant to be used in conjunction with a decorator, such
* as an {@link module:onyx/MenuDecorator~MenuDecorator}. The decorator couples the popup with an
* activating control, which may be a button or any other control with an
* `onActivate` event. When the control is activated, the popup shows itself in
* the correct position relative to the activator.
*
* Note that, by default, the popup is not floating, so toolbars and controls
* with high z-index values may obscure it. You may set the `floating` property
* to `true` to have the popup always appear on top; however, the popup will not
* be in the containing document's flow and so will not scroll with the document.
*
* In addition, while contextual popups have their own positioning logic, they
* do not currently have their own sizing logic, so be sure to take this into
* account when using them.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		ContextualPopup = require('onyx/ContextualPopup'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show Popup'},
* 		{kind: ContextualPopup,
* 			title: 'Sample Popup',
* 			actionButtons: [
* 				{content:'Button 1', classes: 'onyx-button-warning'},
* 				{content:'Button 2'}
* 			],
* 			components: [
* 				{content:'Sample component in popup'}
* 			]
* 		}
* 	]}
* ```
*
* @class ContextualPopup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ContextualPopup~ContextualPopup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ContextualPopup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	autoDismiss: true,

	/**
	* @private
	*/
	floating: false,

	/**
	* @private
	*/
	classes: 'onyx-contextual-popup enyo-unselectable',

	/**
	* @lends module:onyx/ContextualPopup~ContextualPopup.prototype
	* @private
	*/
	published: {
		/**
		* Maximum height of the menu, in pixels.
		*
		* @type {Number}
		* @default  100
		* @public
		*/
		maxHeight: 100,

		/**
		* Whether scrolling is enabled.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		scrolling: true,

		/**
		* Popup title content.
		*
		* @type {String}
		* @public
		*/
		title: undefined,

		/**
		* Buttons displayed at bottom of popup.
		*
		* @type {Array}
		* @public
		*/
		actionButtons: []
	},

	/** @lends module:onyx/ContextualPopup~ContextualPopup */
	statics: {
		/**
		* @private
		*/
		subclass: function (ctor, props) {
			var proto = ctor.prototype;
			if (props.actionButtons) {
				proto.kindActionButtons = props.actionButtons;
				delete proto.actionButtons;
			}
		}
	},

	/**
	* Vertical flush layout margin.
	*
	* @type {Number}
	* @private
	*/
	vertFlushMargin: 60,

	/**
	* Horizontal flush layout margin.
	*
	* @type {Number}
	* @private
	*/
	horizFlushMargin: 50,

	/**
	* Popups wider than this value are considered wide (for layout purposes).
	*
	* @type {Number}
	* @private
	*/
	widePopup: 200,

	/**
	* Popups longer than this value are considered long (for layout purposes).
	*
	* @type {Number}
	* @private
	*/
	longPopup: 200,

	/**
	* Do not allow horizontal flush popups past this amount of buffer space on
	* left/right screen edge.
	*
	* @type {Number}
	* @private
	*/
	horizBuffer: 16,

	/**
	* @private
	*/
	events: {
		onTap: ''
	},

	/**
	* @private
	*/
	handlers: {
		onActivate: 'childControlActivated',
		onRequestShowMenu: 'requestShow',
		onRequestHideMenu: 'requestHide'
	},

	/**
	* @private
	*/
	components: [
		{name: 'title', classes: 'onyx-contextual-popup-title'},
		{classes: 'onyx-contextual-popup-scroller', components:[
			{name: 'client', kind: Scroller, vertical: 'auto', classes: 'enyo-unselectable', thumb: false, strategyKind: TouchScrollStrategy}
		]},
		{name: 'actionButtons', classes: 'onyx-contextual-popup-action-buttons'}
	],

	/**
	* Name of the Scroller component.
	*
	* @private
	*/
	scrollerName: 'client',

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.maxHeightChanged();
		this.titleChanged();
		this.actionButtonsChanged();
	},

	/**
	* @private
	*/
	getScroller: function () {
		return this.$[this.scrollerName];
	},

	/**
	* @private
	*/
	titleChanged: function (){
		this.$.title.setContent(this.title);
	},

	/**
	* @private
	*/
	actionButtonsChanged: function () {
		if (this.actionButtons) {
			utils.forEach(this.actionButtons, function (button) {
				button.kind = Button;
				button.classes = button.classes + ' onyx-contextual-popup-action-button';
				button.popup = this;
				button.actionButton = true;
				this.$.actionButtons.createComponent(button, {
					owner: this.getInstanceOwner()
				});
			}, this);
		} else if (this.kindActionButtons) {
			utils.forEach(this.kindActionButtons, function (button) {
				button.kind = Button;
				button.classes = button.classes + ' onyx-contextual-popup-action-button';
				button.popup = this;
				button.actionButton = true;
				this.$.actionButtons.createComponent(button, {
					owner: this
				});
			}, this);
		}
		if(this.hasNode()) {
			this.$.actionButtons.render();
		}
	},

	/**
	* @private
	*/
	maxHeightChanged: function () {
		if (this.scrolling) {
			this.getScroller().setMaxHeight(this.maxHeight + 'px');
		}
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Popup.prototype.showingChanged.apply(this, arguments);
		if (this.scrolling) {
			this.getScroller().setShowing(this.showing);
		}
		if (!this.showing) {
			this.activator = this.activatorOffset = null;
		}
		this.adjustPosition();
	},

	/**
	* @todo  document why bubbling is explicitly prevented
	* @private
	*/
	childControlActivated: function (sender, event) {
		return true;
	},

	/**
	* Handles `onRequestShowMenu` events.
	*
	* @private
	*/
	requestShow: function (sender, event) {
		this.activator = event.activator.hasNode();
		this.show();
		return true;
	},

	/**
	* Handles `onRequestHideMenu` events.
	*
	* @private
	*/
	requestHide: function (sender, event) {
		this.setShowing(false);
	},

	/**
	* Positions the popup.
	*
	* @todo seems to duplicate enyo.Control.setBounds()
	* @private
	*/
	applyPosition: function (rect) {
		var s = '';
		for (var n in rect) {
			s += (n + ':' + rect[n] + (isNaN(rect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* Calculates the position of the popup relative to the page.
	*
	* @param {Element} node
	* @private
	*/
	getPageOffset: function (node) {
		var r = this.getBoundingRect(node);

		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
		var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
		var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
	},

	/**
	* Adjusts the popup position + nub location & direction.
	*
	* ContextualPopup positioning rules:
	*
	* 1. Activator Location:
	*    1. If activator is located in a corner then position using a flush style.
	*       1. Attempt vertical first.
	*       2. Horizontal if vertical doesn't fit.
	*    2. If not in a corner then check if the activator is located in one of the 4 "edges"
	*       of the view & position the following way if so:
	*       1.   Activator is in top edge, position popup below it.
	*       2.  Activator is in bottom edge, position popup above it.
	*       3. Activator is in left edge, position popup to the right of it.
	*       4.  Activator is in right edge, position popup to the left of it.
		*
	* 2. Screen Size - the popup should generally extend in the direction where there’s room
	*    for it.
	*
	*    Note: no specific logic below for this rule since it is built into the positioning
	*    functions, ie we attempt to never position a popup where there isn't enough room for
	*    it.
	*
	* 3. Popup Size:
	*
	*    1. If popup content is wide, use top or bottom positioning.
	*    2. If popup content is long, use horizontal positioning.
	*
	* 4. Favor top or bottom:
	*
	*    If all the above rules have been followed and location can still vary then favor top
	*    or bottom positioning.
	*
	* 5. If top or bottom will work, favor bottom.
	*
	*    Note: There is no specific logic below for this rule since it is built into the
	*    vertical position functions, i.e., we attempt to use a bottom position for the popup
	*    as much as possible. Additionally, within the vertical position function, we center
	*    the popup if the activator is at the vertical center of the view.
	*	
	* @private
	*/
	adjustPosition: function () {
		if (this.showing && this.hasNode() && this.activator) {
			this.resetPositioning();
			this.activatorOffset = this.getPageOffset(this.activator);
			var innerWidth = this.getViewWidth();
			var innerHeight = this.getViewHeight();

			//These are the view "flush boundaries"
			var topFlushPt = this.vertFlushMargin;
			var bottomFlushPt = innerHeight - this.vertFlushMargin;
			var leftFlushPt = this.horizFlushMargin;
			var rightFlushPt = innerWidth - this.horizFlushMargin;

			//Rule 1 - Activator Location based positioning
			//if the activator is in the top or bottom edges of the view, check if the popup needs flush positioning
			if ((this.activatorOffset.top + this.activatorOffset.height) < topFlushPt || this.activatorOffset.top > bottomFlushPt) {
				//check/try vertical flush positioning	(rule 1.a.i)
				if (this.applyVerticalFlushPositioning(leftFlushPt, rightFlushPt)) {
					return;
				}

				//if vertical doesn't fit then check/try horizontal flush (rule 1.a.ii)
				if (this.applyHorizontalFlushPositioning(leftFlushPt, rightFlushPt)) {
					return;
				}

				//if flush positioning didn't work then try just positioning vertically (rule 1.b.i & rule 1.b.ii)
				if (this.applyVerticalPositioning()){
					return;
				}
			//otherwise check if the activator is in the left or right edges of the view & if so try horizontal positioning
			} else if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt || this.activatorOffset.left > rightFlushPt) {
				//if flush positioning didn't work then try just positioning horizontally (rule 1.b.iii & rule 1.b.iv)
				if (this.applyHorizontalPositioning()){
					return;
				}
			}

			//Rule 2 - no specific logic below for this rule since it is inheritent to the positioning functions, ie we attempt to never
			//position a popup where there isn't enough room for it.

			//Rule 3 - Popup Size based positioning
			var clientRect = this.getBoundingRect(this.node);

			//if the popup is wide then use vertical positioning
			if (clientRect.width > this.widePopup) {
				if (this.applyVerticalPositioning()){
					return;
				}
			}
			//if the popup is long then use horizontal positioning
			else if (clientRect.height > this.longPopup) {
				if (this.applyHorizontalPositioning()){
					return;
				}
			}

			//Rule 4 - Favor top or bottom positioning
			if (this.applyVerticalPositioning()) {
				return;
			}
			//but if thats not possible try horizontal
			else if (this.applyHorizontalPositioning()){
				return;
			}

			//Rule 5 - no specific logic below for this rule since it is built into the vertical position functions, ie we attempt to
			//         use a bottom position for the popup as much possible.
		}
	},

	/**
	* Moves the popup below or above the activator and verifies that it fits onscreen.
	*
	* @return {Boolean} `true` if vertical positioning can be used; otherwise, `false`.
	* @private
	*/
	initVerticalPositioning: function () {
		this.resetPositioning();
		this.addClass('vertical');

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();

		if (this.floating){
			if (this.activatorOffset.top < (innerHeight / 2)) {
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height, bottom: 'auto'});
				this.addClass('below');
			} else {
				this.applyPosition({top: this.activatorOffset.top - clientRect.height, bottom: 'auto'});
				this.addClass('above');
			}
		} else {
			//if the popup's bottom goes off the screen then put it on the top of the invoking control
			if ((clientRect.top + clientRect.height > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))){
				this.addClass('above');
			} else {
				this.addClass('below');
			}
		}

		//if moving the popup above or below the activator puts it past the edge of the screen then vertical doesn't work
		clientRect = this.getBoundingRect(this.node);
		if ((clientRect.top + clientRect.height) > innerHeight || clientRect.top < 0){
			return false;
		}

		return true;
	},

	/**
	* Implements positioning rules (rule 1.b.i & rule 1.b.ii).
	*
	* @return {Boolean} `true` if vertical positioning is used; otherwise, `false`.
	* @private
	*/
	applyVerticalPositioning: function () {
		//if we can't fit the popup above or below the activator then forget vertical positioning
		if (!this.initVerticalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		if (this.floating){
			//Get the left edge delta to horizontally center the popup
			var centeredLeft = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.width/2;
			if (centeredLeft + clientRect.width > innerWidth) {//popup goes off right edge of the screen if centered
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.width});
				this.addClass('left');
			} else if (centeredLeft < 0) {//popup goes off left edge of the screen if centered
				this.applyPosition({left:this.activatorOffset.left});
				this.addClass('right');
			} else {//center the popup
				this.applyPosition({left: centeredLeft});
			}

		} else {
			//Get the left edge delta to horizontally center the popup
			var centeredLeftDelta = this.activatorOffset.left + this.activatorOffset.width/2 - clientRect.left - clientRect.width/2;
			if (clientRect.right + centeredLeftDelta > innerWidth) {//popup goes off right edge of the screen if centered
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width - clientRect.right});
				this.addRemoveClass('left', true);
			} else if (clientRect.left + centeredLeftDelta < 0) {//popup goes off left edge of the screen if centered
				this.addRemoveClass('right', true);
			} else {//center the popup
				this.applyPosition({left: centeredLeftDelta});
			}
		}

		return true;
	},

	/**
	* Implements positioning (rule 1.a.i).
	*
	* @return {Boolean} `true` if vertical flush positioning is used; otherwise, `false`.
	* @private
	*/
	applyVerticalFlushPositioning: function (leftFlushPt, rightFlushPt) {
		//if we can't fit the popup above or below the activator then forget vertical positioning
		if (!this.initVerticalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		//If the activator's right side is within our left side cut off use flush positioning
		if ((this.activatorOffset.left + this.activatorOffset.width/2) < leftFlushPt){
			//if the activator's left edge is too close or past the screen left edge
			if (this.activatorOffset.left + this.activatorOffset.width/2 < this.horizBuffer){
				this.applyPosition({left:this.horizBuffer + (this.floating ? 0 : -clientRect.left)});
			} else {
				this.applyPosition({left:this.activatorOffset.width/2  + (this.floating ? this.activatorOffset.left : 0)});
			}

			this.addClass('right');
			this.addClass('corner');
			return true;
		}
		//If the activator's left side is within our right side cut off use flush positioning
		else if (this.activatorOffset.left + this.activatorOffset.width/2 > rightFlushPt) {
			if ((this.activatorOffset.left+this.activatorOffset.width/2) > (innerWidth-this.horizBuffer)){
				this.applyPosition({left:innerWidth - this.horizBuffer - clientRect.right});
			} else {
				this.applyPosition({left: (this.activatorOffset.left + this.activatorOffset.width/2) - clientRect.right});
			}
			this.addClass('left');
			this.addClass('corner');
			return true;
		}

		return false;
	},

	/**
	* Moves the popup left or right of the activator and verifies that it fits onscreen.
	* A return value of `true` is a precondition for using
	* [applyHorizontalPositioning()]{@link module:onyx/ContextualPopup~ContextualPopup#applyHorizontalPositioning} and
	* [applyHorizontalFlushPositioning()]{@link module:onyx/ContextualPopup~ContextualPopup#applyHorizontalFlushPositioning}.
	*
	* @return {Boolean} `true` if horizontal positioning can be used; otherwise, `false`.
	* @private
	*/
	initHorizontalPositioning: function () {
		this.resetPositioning();

		var clientRect = this.getBoundingRect(this.node);
		var innerWidth = this.getViewWidth();

		//adjust horizontal positioning of the popup & nub vertical positioning
		if (this.floating){
			if ((this.activatorOffset.left + this.activatorOffset.width) < innerWidth/2) {
				this.applyPosition({left: this.activatorOffset.left + this.activatorOffset.width});
				this.addRemoveClass('left', true);
			} else {
				this.applyPosition({left: this.activatorOffset.left - clientRect.width});
				this.addRemoveClass('right', true);
			}
		} else {
			if (this.activatorOffset.left - clientRect.width > 0) {
				this.applyPosition({left: this.activatorOffset.left - clientRect.left - clientRect.width});
				this.addRemoveClass('right', true);
			} else {
				this.applyPosition({left: this.activatorOffset.width});
				this.addRemoveClass('left', true);
			}
		}
		this.addRemoveClass('horizontal', true);

		//if moving the popup left or right of the activator puts it past the edge of the screen then horizontal won't work
		clientRect = this.getBoundingRect(this.node);
		if (clientRect.left < 0 || (clientRect.left + clientRect.width) > innerWidth){
			return false;
		}
		return true;

	},

	/**
	* Implements positioning (rule 1.b.iii & rule 1.b.iv).
	*
	* @return {Boolean} `true` if using horizontal positioning; otherwise, `false`.
	* @private
	*/
	applyHorizontalPositioning: function () {
		//if we can't fit the popup left or right of the activator then forget horizontal positioning
		if (!this.initHorizontalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();
		var activatorCenter = this.activatorOffset.top + this.activatorOffset.height/2;

		if (this.floating){
			//if the activator's center is within 10% of the center of the view, vertically center the popup
			if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height/2, bottom: 'auto'});
			} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
				this.applyPosition({top: this.activatorOffset.top - this.activatorOffset.height, bottom: 'auto'});
				this.addRemoveClass('high', true);
			} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
				this.applyPosition({top: this.activatorOffset.top - clientRect.height + this.activatorOffset.height*2, bottom: 'auto'});
				this.addRemoveClass('low', true);
			}
		} else {
			//if the activator's center is within 10% of the center of the view, vertically center the popup
			if ((activatorCenter >= (innerHeight/2 - 0.05 * innerHeight)) && (activatorCenter <= (innerHeight/2 + 0.05 * innerHeight))) {
				this.applyPosition({top: (this.activatorOffset.height - clientRect.height)/2});
			} else if (this.activatorOffset.top + this.activatorOffset.height < innerHeight/2) { //the activator is in the top 1/2 of the screen
				this.applyPosition({top: -this.activatorOffset.height});
				this.addRemoveClass('high', true);
			} else { //otherwise the popup will be positioned in the bottom 1/2 of the screen
				this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top + this.activatorOffset.height});
				this.addRemoveClass('low', true);
			}
		}
		return true;
	},

	/**
	* Implements positioning (rule 1.a.ii).
	*
	* @return {Boolean} `true` if using flush positioning; otherwise, `false`.
	* @private
	*/
	applyHorizontalFlushPositioning: function (leftFlushPt, rightFlushPt) {
		//if we can't fit the popup left or right of the activator then forget vertical positioning
		if (!this.initHorizontalPositioning()) {
			return false;
		}

		var clientRect = this.getBoundingRect(this.node);
		var innerHeight = this.getViewHeight();

		//adjust vertical positioning (high or low nub & popup position)
		if (this.floating){
			if (this.activatorOffset.top < (innerHeight/2)){
				this.applyPosition({top: this.activatorOffset.top + this.activatorOffset.height/2});
				this.addRemoveClass('high', true);
			} else {
				this.applyPosition({top:this.activatorOffset.top + this.activatorOffset.height/2 - clientRect.height});
				this.addRemoveClass('low', true);
			}
		} else {
			if (((clientRect.top + clientRect.height) > innerHeight) && ((innerHeight - clientRect.bottom) < (clientRect.top - clientRect.height))) {
				this.applyPosition({top: clientRect.top - clientRect.height - this.activatorOffset.top - this.activatorOffset.height/2});
				this.addRemoveClass('low', true);
			} else {
				this.applyPosition({top: this.activatorOffset.height/2});
				this.addRemoveClass('high', true);
			}
		}

		//If the activator's right side is within our left side cut off use flush positioning
		if ((this.activatorOffset.left + this.activatorOffset.width) < leftFlushPt){
			this.addClass('left');
			this.addClass('corner');
			return true;
		}
		//If the activator's left side is within our right side cut off use flush positioning
		else if (this.activatorOffset.left > rightFlushPt) {
			this.addClass('right');
			this.addClass('corner');
			return true;
		}

		return false;
	},

	/**
	* Calculates top/left values that are relative to the viewport and not absolute for the
	* provided Node.
	*
	* @param  {Element} Node.
	* @return {Object}  Object containing the top, bottom, left, right, height, and width of the
	* 	node.
	* @private
	*/
	getBoundingRect:  function (node){
		// getBoundingClientRect returns t
		var o = node.getBoundingClientRect();
		if (!o.width || !o.height) {
			return {
				left: o.left,
				right: o.right,
				top: o.top,
				bottom: o.bottom,
				width: o.right - o.left,
				height: o.bottom - o.top
			};
		}
		return o;
	},

	/**
	* Determines the view height.
	*
	* @return {Number} - Height of the view.
	* @private
	*/
	getViewHeight: function () {
		return (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
	},

	/**
	* Determines the view width.
	*
	* @return {Number} - Width of the view.
	* @private
	*/
	getViewWidth: function () {
		return (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;
	},

	/**
	* Removes all positioning classes and resets the `'top'` and `'left'` CSS attributes.
	*
	* @private
	*/
	resetPositioning: function () {
		this.removeClass('right');
		this.removeClass('left');
		this.removeClass('high');
		this.removeClass('low');
		this.removeClass('corner');
		this.removeClass('below');
		this.removeClass('above');
		this.removeClass('vertical');
		this.removeClass('horizontal');

		this.applyPosition({left: 'auto'});
		this.applyPosition({top: 'auto'});
	},

	/**
	* Handles `resize` events to reposition the popup.
	*
	* @method
	* @private
	*/
	handleResize: function () {
		Popup.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	}
});

}],'onyx/TooltipDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TooltipDecorator~TooltipDecorator} kind.
* @module onyx/TooltipDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('onyx/Button');

/**
* {@link module:onyx/TooltipDecorator~TooltipDecorator} is a control that couples an {@link module:onyx/Tooltip~Tooltip}
* with an activating control, such as a button. The tooltip is displayed when the
* activator generates an `onenter` event:
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
* {kind: TooltipDecorator, components: [
* 	{kind: Button, content: 'Tooltip'},
* 	{kind: Tooltip, content: 'I am a tooltip for a button.'}
* ]}
* ```
*
* Here's an example with an {@link module:onyx/Input~Input} control and an
* {@link module:onyx/InputDecorator~InputDecorator} around the input:
*
* ```
* var
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
* {kind: TooltipDecorator, components: [
* 	{kind: InputDecorator, components: [
* 		{kind: Input, placeholder: 'Just an input...'}
* 	]},
* 	{kind: Tooltip, content: 'I am a tooltip for an input.'}
* ]}
* ```
*
* @class TooltipDecorator
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TooltipDecorator~TooltipDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TooltipDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* @private
	*/
	classes: 'onyx-popup-decorator',

	/**
	* @private
	*/
	handlers: {
		onenter: 'enter',
		onleave: 'leave'
	},

	/**
	* @private
	*/
	enter: function () {
		this.requestShowTooltip();
	},

	/**
	* @private
	*/
	leave: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	tap: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	requestShowTooltip: function () {
		this.waterfallDown('onRequestShowTooltip');
	},

	/**
	* @private
	*/
	requestHideTooltip: function () {
		this.waterfallDown('onRequestHideTooltip');
	}
});

}],'onyx/PickerButton':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/PickerButton~PickerButton} kind.
* @module onyx/PickerButton
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button');

/**
* {@link module:onyx/PickerButton~PickerButton} is a button that, when tapped, shows an
* {@link module:onyx/Picker~Picker}. Once an item is selected, the list of items closes, but
* the item stays selected and the PickerButton displays the choice that was made.
*
* @class PickerButton
* @extends module:onyx/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/PickerButton~PickerButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link module:onyx/Picker~Picker#onChange} event that is waterfalled
	* down from {@link module:onyx/PickerDecorator~PickerDecorator}.
	*
	* @private
	*/
	change: function (sender, event) {
		if (event.content !== undefined){
			this.setContent(event.content);
		}
	}
});

}],'onyx/RadioGroup':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioGroup~RadioGroup} kind.
* @module onyx/RadioGroup
*/

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	RadioButton = require('onyx/RadioButton');

/**
* {@link module:onyx/RadioGroup~RadioGroup} is a group of {@link module:onyx/RadioButton~RadioButton} objects laid out
* horizontally. Within the same radio group, tapping on one radio button will
* release any previously-tapped radio button.
*
* ```
* var RadioGroup = require('onyx/RadioGroup');
*
* {kind: RadioGroup, components: [
* 	{content: 'foo', active: true},
* 	{content: 'bar'},
* 	{content: 'baz'}
* ]}
* ```
*
* @class RadioGroup
* @extends module:enyo/Group~Group
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioGroup~RadioGroup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioGroup',

	/**
	* @private
	*/
	kind: Group,

	/**
	* @private
	*/
	defaultKind: RadioButton,

	/**
	* Set to `true` to provide radio button behavior.
	*
	* @private
	*/
	highlander: true
});

}],'onyx/Menu':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Menu~Menu} kind.
* @module onyx/Menu
*/

var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	MenuItem = require('onyx/MenuItem'),
	Popup = require('onyx/Popup');

/**
* Requests that a menu be displayed and positioned near an activating control.
*
* @event module:onyx/Menu~Menu#onRequestShowMenu
* @type {Object}
* @property {module:enyo/Control~Control} activator - Control near which the menu should be displayed.
* @public
*/

/**
* Requests that a menu be hidden.
*
* @event module:onyx/Menu~Menu#onRequestHideMenu
* @type {Object}
* @public
*/

/**
* {@link module:onyx/Menu~Menu} is a subkind of {@link module:onyx/Popup~Popup} that displays a list of
* {@link module:onyx/MenuItem~MenuItem} objects and looks like a popup menu. It is meant to be
* used together with an {@link module:onyx/MenuDecorator~MenuDecorator}. The decorator couples the
* menu with an activating control, which may be a button or any other control
* with an [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event. When the
* control is activated, the menu shows itself in the correct position relative
* to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show menu'},
* 		{kind: Menu, components: [
* 			{content: '1'},
* 			{content: '2'},
* 			{classes: 'onyx-menu-divider'},
* 			{content: 'Label', classes: 'onyx-menu-label'},
* 			{content: '3'},
* 		]}
* 	]}
* ```
*
* @class Menu
* @extends module:onyx/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Menu~Menu.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Menu',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* When `true`, controls outside of the menu will not receive events while
	* the menu is showing.
	*
	* @private
	*/
	modal: true,

	/**
	* @private
	*/
	defaultKind: MenuItem,

	/**
	* @private
	*/
	classes: 'onyx-menu',

	/**
	* @lends module:onyx/Menu~Menu.prototype
	* @private
	*/
	published: {
		/**
		* Maximum height of the menu, in pixels.
		*
		* @type {Number}
		* @default  200
		* @public
		*/
		maxHeight: 200,

		/**
		* Indicates whether scrolling is enabled.
		*
		* Note that this is a design-time property and should not be set after creation.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		scrolling: true,

		/**
		* The current scroll strategy.
		*
		* @type {String}
		* @default  'TouchScrollStrategy'
		* @public
		*/
		scrollStrategyKind: TouchScrollStrategy
	},

	/**
	* @private
	*/
	handlers: {
		onActivate: 'itemActivated',
		onRequestShowMenu: 'requestMenuShow',
		onRequestHideMenu: 'requestHide'
	},

	/**
	* @private
	*/
	childComponents: [
		{name: 'client', kind: Scroller}
	],

	/**
	* If `true`, menu will be shown on top of activating control, if possible.
	*
	* @type {Boolean}
	* @private
	*/
	showOnTop: false,

	/**
	* @private
	*/
	scrollerName: 'client',

	/**
	* @private
	*/
	create: function () {
		Popup.prototype.create.apply(this, arguments);
		this.maxHeightChanged();
	},

	/**
	* @private
	*/
	initComponents: function () {
		if (this.scrolling) {
			this.createComponents(this.childComponents, {isChrome: true, strategyKind: this.scrollStrategyKind});
		}
		Popup.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	getScroller: function () {
		return this.$[this.scrollerName];
	},

	/**
	* @private
	*/
	maxHeightChanged: function () {
		if (this.scrolling) {
			this.getScroller().setMaxHeight(this.maxHeight + 'px');
		}
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* @private
	*/
	itemActivated: function (sender, event) {
		event.originator.setActive(false);
		return true;
	},

	/**
	* @private
	*/
	showingChanged: function () {
		Popup.prototype.showingChanged.apply(this, arguments);
		if (this.scrolling) {
			this.getScroller().setShowing(this.showing);
		}
		this.adjustPosition(true);
	},

	/**
	* Handles [onRequestShowMenu]{@link module:onyx/Menu~Menu#onRequestShowMenu} events.
	*
	* @private
	*/
	requestMenuShow: function (sender, event) {
		if (this.floating) {
			var n = event.activator.hasNode();
			if (n) {
				var r = this.activatorOffset = this.getPageOffset(n);
				this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), left: r.left, width: r.width});
			}
		}
		this.show();
		return true;
	},

	/**
	* Applies CSS styles to position the menu.
	*
	* @param  {Object} rect - Object with at least one position attribute
	* 	(`'top'`, `'right'`, `'bottom'`, `'left'`).
	* @private
	* @todo Duplicate of {@link module:onyx/ContextualPopup~ContextualPopup#applyPosition} and possibly `setBounds()`
	*/
	applyPosition: function (rect) {
		var s = '';
		for (var n in rect) {
			s += (n + ':' + rect[n] + (isNaN(rect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* Calculates the position of the popup relative to the page.
	*
	* @param {Element} node - The DOM node.
	* @return {Object} Object containing `'top'`, `'left'`, `'height'`, and
	* `'width'` values for the page.
	* @private
	* @todo  Duplicate of {@link module:onyx/ContextualPopup~ContextualPopup#getPageOffset}
	*/
	getPageOffset: function (node) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var r = node.getBoundingClientRect();

		return {top: r.top + window.pageYOffset, left: r.left + window.pageXOffset, height: r.height, width: r.width};
	},

	/**
	* Adjusts the menu position to fit inside the current window size.
	* Note that we aren't currently adjusting picker scroller heights.
	*
	* @private
	*/
	adjustPosition: function () {
		if (this.showing && this.hasNode()) {
			if (this.scrolling && !this.showOnTop) {
				this.getScroller().setMaxHeight(this.maxHeight+'px');
			}
			this.removeClass('onyx-menu-up');

			//reset the left position before we get the bounding rect for proper horizontal calculation
			if (!this.floating) {
				this.applyPosition({left: 'auto'});
			}

			var b = this.node.getBoundingClientRect();
			var bHeight = (b.height === undefined) ? (b.bottom - b.top) : b.height;
			var innerHeight = (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
			var innerWidth = (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;

			//position the menu above the activator if it's getting cut off, but only if there's more room above than below
			this.menuUp = (b.top + bHeight > innerHeight) && ((innerHeight - b.bottom) < (b.top - bHeight));
			this.addRemoveClass('onyx-menu-up', this.menuUp);

			//if floating, adjust the vertical positioning
			if (this.floating) {
				var r = this.activatorOffset;
				//if the menu doesn't fit below the activator, move it up
				if (this.menuUp) {
					this.applyPosition({top: (r.top - bHeight + (this.showOnTop ? r.height : 0)), bottom: 'auto'});
				}
				else {
					//if the top of the menu is above the top of the activator and there's room to move it down, do so
					if ((b.top < r.top) && (r.top + (this.showOnTop ? 0 : r.height) + bHeight < innerHeight))
					{
						this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), bottom: 'auto'});
					}
				}
			}

			//adjust the horizontal positioning to keep the menu from being cut off on the right
			if ((b.right) > innerWidth) {
				if (this.floating){
					this.applyPosition({left:innerWidth-b.width});
				} else {
					this.applyPosition({left: -(b.right - innerWidth)});
				}
			}

			//finally prevent the menu from being cut off on the left
			if (b.left < 0) {
				if (this.floating){
					this.applyPosition({left: 0, right:'auto'});
				} else {
					//handle the situation where a non-floating menu is right or left aligned
					if (this.getComputedStyleValue('right') == 'auto'){
						this.applyPosition({left:-b.left});
					} else {
						this.applyPosition({right:b.left});
					}
				}
			}

			//adjust the scroller height based on room available - only doing this for menus currently
			if (this.scrolling && !this.showOnTop){
				b = this.node.getBoundingClientRect(); //update to the current menu position
				var scrollerHeight;
				if (this.menuUp){
					scrollerHeight = (this.maxHeight < b.bottom) ? this.maxHeight : b.bottom;
				} else {
					scrollerHeight = ((b.top + this.maxHeight) < innerHeight) ? this.maxHeight : (innerHeight - b.top);
				}
				this.getScroller().setMaxHeight(scrollerHeight+'px');
			}
		}
	},

	/**
	* Handles `onresize` events, adjusting the position of the menu.
	*
	* @private
	*/
	handleResize: function () {
		Popup.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	},

	/**
	* Handles [onRequestMenuHide]{@link module:onyx/Menu~Menu#onRequestMenuHide} events.
	*
	* @private
	*/
	requestHide: function (){
		this.setShowing(false);
	}
});

}],'onyx/MenuDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuDecorator~MenuDecorator} kind.
* @module onyx/MenuDecorator
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	TooltipDecorator = require('onyx/TooltipDecorator');

/**
* {@link module:onyx/MenuDecorator~MenuDecorator} is a control that loosely couples an {@link module:onyx/Menu~Menu}
* with an activating control, which may be a button or any other control with an
* [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event. The decorator must
* surround both the activating control and the menu itself. When the menu is
* activated, it shows itself in the correct position relative to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Menu = require('onyx/Menu'),
* 		MenuDecorator = require('onyx/MenuDecorator');
*
* 	{kind: MenuDecorator, components: [
* 		{content: 'Show menu'},
* 		{kind: Menu, components: [
* 			{content: '1'},
* 			{content: '2'},
* 			{classes: 'onyx-menu-divider'},
* 			{content: 'Label', classes: 'onyx-menu-label'},
* 			{content: '3'},
* 		]}
* 	]}
* ```
*
* @class MenuDecorator
* @extends module:onyx/TooltipDecorator~TooltipDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuDecorator~MenuDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuDecorator',

	/**
	* @private
	*/
	kind: TooltipDecorator,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* Selection on iOS prevents tap events, so avoid.
	*
	* @private
	*/
	classes: 'onyx-popup-decorator enyo-unselectable',

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activated',
		onHide: 'menuHidden'
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* @private
	*/
	activated: function (sender, event) {
		this.requestHideTooltip();
		if (event.originator.active) {
			this.menuActive = true;
			this.activator = event.originator;
			this.activator.addClass('active');
			this.requestShowMenu();
		}
	},

	/**
	* Requests that the child menu be shown.
	*
	* @fires module:onyx/Menu~Menu#onRequestShowMenu
	* @private
	*/
	requestShowMenu: function () {
		this.waterfallDown('onRequestShowMenu', {activator: this.activator});
	},

	/**
	* Requests that the child menu be hidden.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @private
	*/
	requestHideMenu: function () {
		this.waterfallDown('onRequestHideMenu');
	},

	/**
	* Handles [onHide]{@link module:enyo/Popup~Popup#onHide} events.
	*
	* @private
	*/
	menuHidden: function () {
		this.menuActive = false;
		if (this.activator) {
			this.activator.setActive(false);
			this.activator.removeClass('active');
		}
	},

	/**
	* Handles `onenter` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	enter: function (sender) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.enter.apply(this, arguments);
		}
	},

	/**
	* Handles `onleave` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	leave: function (sender, event) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.leave.apply(this, arguments);
		}
	}
});

}],'onyx/Picker':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Picker~Picker} kind.
* @module onyx/Picker
*/

var
	kind = require('enyo/kind');

var
	Menu = require('onyx/Menu');

/**
* Fires when the currently selected item changes.
*
* @event module:onyx/Picker~Picker#onChange
* @type {Object}
* @property {module:enyo/Control~Control} selected - The currently selected item.`
* @property {String} content - The content of the currently selected item.
* @public
*/

/**
* {@link module:onyx/Picker~Picker}, a subkind of {@link module:onyx/Menu~Menu}, is used to display a
* list of items that may be selected. It is meant to be used together with an
* {@link module:onyx/PickerDecorator~PickerDecorator}. The decorator loosely couples the picker with
* an {@link module:onyx/PickerButton~PickerButton}--a button that, when tapped, shows the picker.
* Once an item is selected, the list of items closes, but the item stays
* selected and the PickerButton displays the choice that was made.
*
* To initialize the Picker to a particular value, set the `active` property to
* `true` for the item that should be selected.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Picker = require('onyx/Picker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	{kind: PickerDecorator, components: [
* 		{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 		{kind: Picker, components: [
* 			{content: 'Gmail', active: true},
* 			{content: 'Yahoo'},
* 			{content: 'Outlook'},
* 			{content: 'Hotmail'}
* 		]}
* 	]}
* ```
*
* Each item in the list is an {@link module:onyx/MenuItem~MenuItem}, so a client app may
* listen for an [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with the
* item to determine which picker item was selected.
*
* @class Picker
* @extends module:onyx/Menu~Menu
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Picker~Picker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Picker',

	/**
	* @private
	*/
	kind: Menu,

	/**
	* @private
	*/
	classes: 'onyx-picker enyo-unselectable',

	/**
	* @lends module:onyx/Picker~Picker.prototype
	* @private
	*/
	published: {
		/**
		* Currently selected item, if any
		* @type {module:onyx/MenuItem~MenuItem}
		* @default  null
		* @public
		*/
		selected: null
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	handlers: {
		onItemContentChange: 'itemContentChange'
	},

	/**
	* When `true`, the picker is rendered in a floating layer outside of other
	* controls. This can be used to guarantee that the picker will be shown on
	* top of other controls.
	*
	* @private
	*/
	floating: true,

	/**
	* Overrides default value from {@link module:onyx/Menu~Menu}.
	*
	* @private
	*/
	showOnTop: true,

	/**
	* @private
	*/
	initComponents: function () {
		this.setScrolling(true);
		Menu.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.getScroller().setShowing(this.showing);
		Menu.prototype.showingChanged.apply(this, arguments);
		if (this.showing && this.selected) {
			this.scrollToSelected();
		}
	},

	/**
	* Ensures that the selected item is visible.
	*
	* @private
	*/
	scrollToSelected: function () {
		this.getScroller().scrollToControl(this.selected, !this.menuUp);
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event,
	* selecting the activated item.
	*
	* @private
	*/
	itemActivated: function (sender, event) {
		this.processActivatedItem(event.originator);
		return Menu.prototype.itemActivated.apply(this, arguments);
	},

	/**
	* If passed-in control is `active`, selects it.
	* @param {module:enyo/Control~Control} item
	*
	* @private
	*/
	processActivatedItem: function (item) {
		if (item.active) {
			this.setSelected(item);
		}
	},

	/**
	* Highlights the selected item with the CSS class `'selected'`.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	selectedChanged: function (old) {
		if (old) {
			old.removeClass('selected');
		}
		if (this.selected) {
			this.selected.addClass('selected');
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles [onItemContentChange]{@link module:onyx/MenuItem~MenuItem#onItemContentChange}
	* events.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	itemContentChange: function (sender, event) {
		if (event.originator == this.selected) {
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles `onresize` events.
	*
	* @private
	*/
	handleResize: function () {
		Menu.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	}
});

}],'onyx/PickerDecorator':[function (module,exports,global,require,request){
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/PickerDecorator~PickerDecorator} kind.
* @module onyx/PickerDecorator
*/

var
	kind = require('enyo/kind');

var
	MenuDecorator = require('onyx/MenuDecorator'),
	PickerButton = require('onyx/PickerButton');

/**
* {@link module:onyx/PickerDecorator~PickerDecorator} is a control that loosely couples an
* {@link module:onyx/Picker~Picker} with an activating {@link module:onyx/PickerButton~PickerButton}. The
* decorator must surround both the activating button and the picker itself.
* When the button is activated, the picker shows itself in the correct
* position relative to the activator.
*
* ```javascript
* 	var
* 		kind = require('enyo/kind'),
* 		Picker = require('onyx/Picker'),
* 		PickerDecorator = require('onyx/PickerDecorator');
*
* 	{kind: PickerDecorator, components: [
* 		{}, // this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 		{kind: Picker, components: [
* 			{content: 'Gmail', active: true},
* 			{content: 'Yahoo'},
* 			{content: 'Outlook'},
* 			{content: 'Hotmail'}
* 		]}
* 	]}
* ```
*
* @class PickerDecorator
* @extends module:onyx/MenuDecorator~MenuDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/PickerDecorator~PickerDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerDecorator',

	/**
	* @private
	*/
	kind: MenuDecorator,

	/**
	* @private
	*/
	classes: 'onyx-picker-decorator',

	/**
	* @private
	*/
	defaultKind: PickerButton,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link module:onyx/Picker~Picker#onChange} event, waterfalling
	* it down to children.
	*
	* @private
	*/
	change: function (sender, event) {
		this.waterfallDown('onChange', event);
	}
});

}]
	};

});
//# sourceMappingURL=onyx.js.map