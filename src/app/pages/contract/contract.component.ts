import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';
declare var $;
declare var jQuery;
declare var window;
declare var JQClass;

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  slug: any;
  jobDetails: any;
  image_path: any;
  roleId: any;
  token: any;
  submitForm: FormGroup;
  ratingForm: FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 4;
  submitted = false;
  submitted1 = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    private toastr: ToastrService,
    private pageService: PagesService) { }


  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

  addClass(star) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }
  }
  removeClass(star) {
    let ab = "";
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

  messageconnection: any;
  to_user_id: any;
  getjobDetails(slug) {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.set('slug', slug);
    this.pageService.getJobDetails(token, formData).subscribe((res: any) => {
      console.log(res);
      if (res.status && res.response_data) {
        this.jobDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';

        if (this.jobDetails && this.jobDetails.jobproposals) {
          for (let j = 0; j < this.jobDetails.jobproposals.length; j++) {
            this.messageconnection = this.jobDetails.jobproposals[j].messageconnection.id;
            this.to_user_id = this.jobDetails.jobproposals[j].messageconnection.to_user_id;
            // if(this.jobDetails.jobproposals[j].status ==2 && this.jobDetails.jobproposals[j].jobcontracts){
            //   for(let k=0; k<this.jobDetails.jobproposals[j].jobcontracts.length; k++){
            //     if(this.jobDetails.jobproposals[j].jobcontracts[k])
            //   }
            // }
          }

        }
      }
    }, err => {
      console.log(err);
    })
  }

  get f() { return this.submitForm.controls; }
  get g() { return this.ratingForm.controls; }
  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.roleId = localStorage.getItem("roleId");
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.slug);
    if (this.slug) {
      this.getjobDetails(this.slug);
    }

    this.submitForm = this.formBuilder.group({
      body: ['', [Validators.required]],
      // category_id: ['', [Validators.required]],
      // selectedTags: [[], [Validators.required]]
      // tag_id: ['', [Validators.required]]
    });

    this.ratingForm = this.formBuilder.group({
      body: ['', [Validators.required]],
    });

    (function () {
      var initializing = false;

      // The base JQClass implementation (does nothing)
      window.JQClass = function () { };

      // Collection of derived classes
      JQClass.classes = {};

      // Create a new JQClass that inherits from this class
      JQClass.extend = function extender(prop) {
        var base = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
          // Check if we're overwriting an existing function
          prototype[name] = typeof prop[name] == 'function' &&
            typeof base[name] == 'function' ?
            (function (name, fn) {
              return function () {
                var __super = this._super;

                // Add a new ._super() method that is the same method
                // but on the super-class
                this._super = function (args) {
                  return base[name].apply(this, args || []);
                };

                var ret = fn.apply(this, arguments);

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                this._super = __super;

                return ret;
              };
            })(name, prop[name]) :
            prop[name];
        }

        // The dummy class constructor
        function JQClass() {
          // All construction is actually done in the init method
          if (!initializing && this._init) {
            this._init.apply(this, arguments);
          }
        }

        // Populate our constructed prototype object
        JQClass.prototype = prototype;

        // Enforce the constructor to be what we expect
        JQClass.prototype.constructor = JQClass;

        // And make this class extendable
        JQClass.extend = extender;

        return JQClass;
      };
    })();

    (function ($) { // Ensure $, encapsulate

      /** Abstract base class for collection plugins v1.0.1.
        Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
        Licensed under the MIT (https://github.com/jquery/jquery/blob/master/LICENSE.txt) license.
        @module $.JQPlugin
        @abstract */
      JQClass.classes.JQPlugin = JQClass.extend({

        /** Name to identify this plugin.
          @example name: 'tabs' */
        name: 'plugin',

        /** Default options for instances of this plugin (default: {}).
          @example defaultOptions: {
       selectedClass: 'selected',
       triggers: 'click'
     } */
        defaultOptions: {},

        /** Options dependent on the locale.
          Indexed by language and (optional) country code, with '' denoting the default language (English/US).
          @example regionalOptions: {
      '': {
        greeting: 'Hi'
      }
     } */
        regionalOptions: {},

        /** Names of getter methods - those that can't be chained (default: []).
          @example _getters: ['activeTab'] */
        _getters: [],

        /** Retrieve a marker class for affected elements.
          @private
          @return {string} The marker class. */
        _getMarker: function () {
          return 'is-' + this.name;
        },

        /** Initialise the plugin.
          Create the jQuery bridge - plugin name <code>xyz</code>
          produces <code>$.xyz</code> and <code>$.fn.xyz</code>. */
        _init: function () {
          // Apply default localisations
          $.extend(this.defaultOptions, (this.regionalOptions && this.regionalOptions['']) || {});
          // Camel-case the name
          var jqName = camelCase(this.name);
          // Expose jQuery singleton manager
          $[jqName] = this;
          // Expose jQuery collection plugin
          $.fn[jqName] = function (options) {
            var otherArgs = Array.prototype.slice.call(arguments, 1);
            if ($[jqName]._isNotChained(options, otherArgs)) {
              return $[jqName][options].apply($[jqName], [this[0]].concat(otherArgs));
            }
            return this.each(function () {
              if (typeof options === 'string') {
                if (options[0] === '_' || !$[jqName][options]) {
                  throw 'Unknown method: ' + options;
                }
                $[jqName][options].apply($[jqName], [this].concat(otherArgs));
              }
              else {
                $[jqName]._attach(this, options);
              }
            });
          };
        },

        /** Set default values for all subsequent instances.
          @param options {object} The new default options.
          @example $.plugin.setDefauls({name: value}) */
        setDefaults: function (options) {
          $.extend(this.defaultOptions, options || {});
        },

        /** Determine whether a method is a getter and doesn't permit chaining.
          @private
          @param name {string} The method name.
          @param otherArgs {any[]} Any other arguments for the method.
          @return {boolean} True if this method is a getter, false otherwise. */
        _isNotChained: function (name, otherArgs) {
          if (name === 'option' && (otherArgs.length === 0 ||
            (otherArgs.length === 1 && typeof otherArgs[0] === 'string'))) {
            return true;
          }
          return $.inArray(name, this._getters) > -1;
        },

        /** Initialise an element. Called internally only.
          Adds an instance object as data named for the plugin.
          @param elem {Element} The element to enhance.
          @param options {object} Overriding settings. */
        _attach: function (elem, options) {
          elem = $(elem);
          if (elem.hasClass(this._getMarker())) {
            return;
          }
          elem.addClass(this._getMarker());
          options = $.extend({}, this.defaultOptions, this._getMetadata(elem), options || {});
          var inst = $.extend({ name: this.name, elem: elem, options: options },
            this._instSettings(elem, options));
          elem.data(this.name, inst); // Save instance against element
          this._postAttach(elem, inst);
          this.option(elem, options);
        },

        /** Retrieve additional instance settings.
          Override this in a sub-class to provide extra settings.
          @param elem {jQuery} The current jQuery element.
          @param options {object} The instance options.
          @return {object} Any extra instance values.
          @example _instSettings: function(elem, options) {
       return {nav: elem.find(options.navSelector)};
     } */
        _instSettings: function (elem, options) {
          return {};
        },

        /** Plugin specific post initialisation.
          Override this in a sub-class to perform extra activities.
          @param elem {jQuery} The current jQuery element.
          @param inst {object} The instance settings.
          @example _postAttach: function(elem, inst) {
       elem.on('click.' + this.name, function() {
         ...
       });
     } */
        _postAttach: function (elem, inst) {
        },

        /** Retrieve metadata configuration from the element.
          Metadata is specified as an attribute:
          <code>data-&lt;plugin name>="&lt;setting name>: '&lt;value>', ..."</code>.
          Dates should be specified as strings in this format: 'new Date(y, m-1, d)'.
          @private
          @param elem {jQuery} The source element.
          @return {object} The inline configuration or {}. */
        _getMetadata: function (elem) {
          try {
            var data = elem.data(this.name.toLowerCase()) || '';
            data = data.replace(/'/g, '"');
            data = data.replace(/([a-zA-Z0-9]+):/g, function (match, group, i) {
              var count = data.substring(0, i).match(/"/g); // Handle embedded ':'
              return (!count || count.length % 2 === 0 ? '"' + group + '":' : group + ':');
            });
            data = $.parseJSON('{' + data + '}');
            for (var name in data) { // Convert dates
              var value = data[name];
              if (typeof value === 'string' && value.match(/^new Date\((.*)\)$/)) {
                data[name] = eval(value);
              }
            }
            return data;
          }
          catch (e) {
            return {};
          }
        },

        /** Retrieve the instance data for element.
          @param elem {Element} The source element.
          @return {object} The instance data or {}. */
        _getInst: function (elem) {
          return $(elem).data(this.name) || {};
        },

        /** Retrieve or reconfigure the settings for a plugin.
          @param elem {Element} The source element.
          @param name {object|string} The collection of new option values or the name of a single option.
          @param [value] {any} The value for a single named option.
          @return {any|object} If retrieving a single value or all options.
          @example $(selector).plugin('option', 'name', value)
     $(selector).plugin('option', {name: value, ...})
     var value = $(selector).plugin('option', 'name')
     var options = $(selector).plugin('option') */
        option: function (elem, name, value) {
          elem = $(elem);
          var inst = elem.data(this.name);
          if (!name || (typeof name === 'string' && value == null)) {
            var options = (inst || {}).options;
            return (options && name ? options[name] : options);
          }
          if (!elem.hasClass(this._getMarker())) {
            return;
          }
          var options = name || {};
          if (typeof name === 'string') {
            options = {};
            options[name] = value;
          }
          this._optionsChanged(elem, inst, options);
          $.extend(inst.options, options);
        },

        /** Plugin specific options processing.
          Old value available in <code>inst.options[name]</code>, new value in <code>options[name]</code>.
          Override this in a sub-class to perform extra activities.
          @param elem {jQuery} The current jQuery element.
          @param inst {object} The instance settings.
          @param options {object} The new options.
          @example _optionsChanged: function(elem, inst, options) {
       if (options.name != inst.options.name) {
         elem.removeClass(inst.options.name).addClass(options.name);
       }
     } */
        _optionsChanged: function (elem, inst, options) {
        },

        /** Remove all trace of the plugin.
          Override <code>_preDestroy</code> for plugin-specific processing.
          @param elem {Element} The source element.
          @example $(selector).plugin('destroy') */
        destroy: function (elem) {
          elem = $(elem);
          if (!elem.hasClass(this._getMarker())) {
            return;
          }
          this._preDestroy(elem, this._getInst(elem));
          elem.removeData(this.name).removeClass(this._getMarker());
        },

        /** Plugin specific pre destruction.
          Override this in a sub-class to perform extra activities and undo everything that was
          done in the <code>_postAttach</code> or <code>_optionsChanged</code> functions.
          @param elem {jQuery} The current jQuery element.
          @param inst {object} The instance settings.
          @example _preDestroy: function(elem, inst) {
       elem.off('.' + this.name);
     } */
        _preDestroy: function (elem, inst) {
        }
      });

      /** Convert names from hyphenated to camel-case.
        @private
        @param value {string} The original hyphenated name.
        @return {string} The camel-case version. */
      function camelCase(name) {
        return name.replace(/-([a-z])/g, function (match, group) {
          return group.toUpperCase();
        });
      }

      /** Expose the plugin base.
        @namespace "$.JQPlugin" */
      $.JQPlugin = {

        /** Create a new collection plugin.
          @memberof "$.JQPlugin"
          @param [superClass='JQPlugin'] {string} The name of the parent class to inherit from.
          @param overrides {object} The property/function overrides for the new class.
          @example $.JQPlugin.createPlugin({
       name: 'tabs',
       defaultOptions: {selectedClass: 'selected'},
       _initSettings: function(elem, options) { return {...}; },
       _postAttach: function(elem, inst) { ... }
     }); */
        createPlugin: function (superClass, overrides) {
          if (typeof superClass === 'object') {
            overrides = superClass;
            superClass = 'JQPlugin';
          }
          superClass = camelCase(superClass);
          var className = camelCase(overrides.name);
          JQClass.classes[className] = JQClass.classes[superClass].extend(overrides);
          new JQClass.classes[className]();
        }
      };

    })(jQuery);

    /* http://keith-wood.name/countdown.html
       Countdown for jQuery v2.0.1.
       Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
       Available under the MIT (https://github.com/jquery/jquery/blob/master/LICENSE.txt) license. 
       Please attribute the author if you use it. */

    (function ($) { // Hide scope, no $ conflict

      var pluginName = 'countdown';

      var Y = 0; // Years
      var O = 1; // Months
      var W = 2; // Weeks
      var D = 3; // Days
      var H = 4; // Hours
      var M = 5; // Minutes
      var S = 6; // Seconds

      /** Create the countdown plugin.
        <p>Sets an element to show the time remaining until a given instant.</p>
        <p>Expects HTML like:</p>
        <pre>&lt;div>&lt;/div></pre>
        <p>Provide inline configuration like:</p>
        <pre>&lt;div data-countdown="name: 'value'">&lt;/div></pre>
         @module Countdown
        @augments JQPlugin
        @example $(selector).countdown({until: +300}) */
      $.JQPlugin.createPlugin({

        /** The name of the plugin. */
        name: pluginName,

        /** Countdown expiry callback.
          Triggered when the countdown expires.
          @callback expiryCallback */

        /** Countdown server synchronisation callback.
          Triggered when the countdown is initialised.
          @callback serverSyncCallback
          @return {Date} The current date/time on the server as expressed in the local timezone. */

        /** Countdown tick callback.
          Triggered on every <code>tickInterval</code> ticks of the countdown.
          @callback tickCallback
          @param periods {number[]} The breakdown by period (years, months, weeks, days,
              hours, minutes, seconds) of the time remaining/passed. */

        /** Countdown which labels callback.
          Triggered when the countdown is being display to determine which set of labels
          (<code>labels</code>, <code>labels1</code>, ...) are to be used for the current period value.
          @callback whichLabelsCallback
          @param num {number} The current period value.
          @return {number} The suffix for the label set to use. */

        /** Default settings for the plugin.
          @property until {Date|number|string} The date/time to count down to, or number of seconds
                offset from now, or string of amounts and units for offset(s) from now:
                'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
          @example until: new Date(2013, 12-1, 25, 13, 30)
     until: +300
     until: '+1O -2D'
          @property [since] {Date|number|string} The date/time to count up from, or
                number of seconds offset from now, or string for unit offset(s):
                'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
          @example since: new Date(2013, 1-1, 1)
     since: -300
     since: '-1O +2D'
          @property [timezone=null] {number} The timezone (hours or minutes from GMT) for the target times,
                or null for client local timezone.
          @example timezone: +10
     timezone: -60
          @property [serverSync=null] {serverSyncCallback} A function to retrieve the current server time
                for synchronisation.
          @property [format='dHMS'] {string} The format for display - upper case for always, lower case only if non-zero,
                'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds.
          @property [layout=''] {string} Build your own layout for the countdown.
          @example layout: '{d<}{dn} {dl}{d>} {hnn}:{mnn}:{snn}'
          @property [compact=false] {boolean} True to display in a compact format, false for an expanded one.
          @property [padZeroes=false] {boolean} True to add leading zeroes
          @property [significant=0] {number} The number of periods with non-zero values to show, zero for all.
          @property [description=''] {string} The description displayed for the countdown.
          @property [expiryUrl=''] {string} A URL to load upon expiry, replacing the current page.
          @property [expiryText=''] {string} Text to display upon expiry, replacing the countdown. This may be HTML.
          @property [alwaysExpire=false] {boolean} True to trigger <code>onExpiry</code> even if target time has passed.
          @property [onExpiry=null] {expiryCallback} Callback when the countdown expires -
                receives no parameters and <code>this</code> is the containing division.
          @example onExpiry: function() {
      ...
     }
          @property [onTick=null] {tickCallback} Callback when the countdown is updated -
                receives <code>number[7]</code> being the breakdown by period
                (years, months, weeks, days, hours, minutes, seconds - based on
                <code>format</code>) and <code>this</code> is the containing division.
          @example onTick: function(periods) {
       var secs = $.countdown.periodsToSeconds(periods);
       if (secs < 300) { // Last five minutes
        ...
       }
     }
          @property [tickInterval=1] {number} The interval (seconds) between <code>onTick</code> callbacks. */
        defaultOptions: {
          until: null,
          since: null,
          timezone: null,
          serverSync: null,
          format: 'dHMS',
          layout: '',
          compact: false,
          padZeroes: false,
          significant: 0,
          description: '',
          expiryUrl: '',
          expiryText: '',
          alwaysExpire: false,
          onExpiry: null,
          onTick: null,
          tickInterval: 1
        },

        /** Localisations for the plugin.
          Entries are objects indexed by the language code ('' being the default US/English).
          Each object has the following attributes.
          @property [labels=['Years','Months','Weeks','Days','Hours','Minutes','Seconds']] {string[]}
                The display texts for the counter periods.
          @property [labels1=['Year','Month','Week','Day','Hour','Minute','Second']] {string[]}
                The display texts for the counter periods if they have a value of 1.
                Add other <code>labels<em>n</em></code> attributes as necessary to
                cater for other numeric idiosyncrasies of the localisation.
          @property [compactLabels=['y','m','w','d']] {string[]} The compact texts for the counter periods.
          @property [whichLabels=null] {whichLabelsCallback} A function to determine which
                <code>labels<em>n</em></code> to use.
          @example whichLabels: function(num) {
      return (num > 1 ? 0 : 1);
     }
          @property [digits=['0','1',...,'9']] {number[]} The digits to display (0-9).
          @property [timeSeparator=':'] {string} Separator for time periods in the compact layout.
          @property [isRTL=false] {boolean} True for right-to-left languages, false for left-to-right. */
        regionalOptions: { // Available regional settings, indexed by language/country code
          '': { // Default regional settings - English/US
            labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
            labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
            compactLabels: ['y', 'm', 'w', 'd'],
            whichLabels: null,
            digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            timeSeparator: ':',
            isRTL: false
          }
        },

        /** Names of getter methods - those that can't be chained. */
        _getters: ['getTimes'],

        /* Class name for the right-to-left marker. */
        _rtlClass: pluginName + '-rtl',
        /* Class name for the countdown section marker. */
        _sectionClass: pluginName + '-section',
        /* Class name for the period amount marker. */
        _amountClass: pluginName + '-amount',
        /* Class name for the period name marker. */
        _periodClass: pluginName + '-period',
        /* Class name for the countdown row marker. */
        _rowClass: pluginName + '-row',
        /* Class name for the holding countdown marker. */
        _holdingClass: pluginName + '-holding',
        /* Class name for the showing countdown marker. */
        _showClass: pluginName + '-show',
        /* Class name for the description marker. */
        _descrClass: pluginName + '-descr',

        /* List of currently active countdown elements. */
        _timerElems: [],

        /** Additional setup for the countdown.
          Apply default localisations.
          Create the timer. */
        _init: function () {
          var self = this;
          this._super();
          this._serverSyncs = [];
          var now = (typeof Date.now == 'function' ? Date.now :
            function () { return new Date().getTime(); });
          var perfAvail = (window.performance && typeof window.performance.now == 'function');
          // Shared timer for all countdowns
          function timerCallBack(timestamp) {
            var drawStart = (timestamp < 1e12 ? // New HTML5 high resolution timer
              (perfAvail ? (performance.now() + performance.timing.navigationStart) : now()) :
              // Integer milliseconds since unix epoch
              timestamp || now());
            if (drawStart - animationStartTime >= 1000) {
              self._updateElems();
              animationStartTime = drawStart;
            }
            requestAnimationFrame(timerCallBack);
          }
          var requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
          // This is when we expect a fall-back to setInterval as it's much more fluid
          var animationStartTime = 0;
          if (!requestAnimationFrame || $.noRequestAnimationFrame) {
            $.noRequestAnimationFrame = null;
            setInterval(function () { self._updateElems(); }, 980); // Fall back to good old setInterval
          }
          else {
            animationStartTime = window.animationStartTime ||
              window.webkitAnimationStartTime || window.mozAnimationStartTime ||
              window.oAnimationStartTime || window.msAnimationStartTime || now();
            requestAnimationFrame(timerCallBack);
          }
        },

        /** Convert a date/time to UTC.
          @param tz {number} The hour or minute offset from GMT, e.g. +9, -360.
          @param year {Date|number} the date/time in that timezone or the year in that timezone.
          @param [month] {number} The month (0 - 11) (omit if <code>year</code> is a <code>Date</code>).
          @param [day] {number} The day (omit if <code>year</code> is a <code>Date</code>).
          @param [hours] {number} The hour (omit if <code>year</code> is a <code>Date</code>).
          @param [mins] {number} The minute (omit if <code>year</code> is a <code>Date</code>).
          @param [secs] {number} The second (omit if <code>year</code> is a <code>Date</code>).
          @param [ms] {number} The millisecond (omit if <code>year</code> is a <code>Date</code>).
          @return {Date} The equivalent UTC date/time.
          @example $.countdown.UTCDate(+10, 2013, 12-1, 25, 12, 0)
     $.countdown.UTCDate(-7, new Date(2013, 12-1, 25, 12, 0)) */
        UTCDate: function (tz, year, month, day, hours, mins, secs, ms) {
          if (typeof year == 'object' && year.constructor == Date) {
            ms = year.getMilliseconds();
            secs = year.getSeconds();
            mins = year.getMinutes();
            hours = year.getHours();
            day = year.getDate();
            month = year.getMonth();
            year = year.getFullYear();
          }
          var d = new Date();
          d.setUTCFullYear(year);
          d.setUTCDate(1);
          d.setUTCMonth(month || 0);
          d.setUTCDate(day || 1);
          d.setUTCHours(hours || 0);
          d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? tz * 60 : tz));
          d.setUTCSeconds(secs || 0);
          d.setUTCMilliseconds(ms || 0);
          return d;
        },

        /** Convert a set of periods into seconds.
         Averaged for months and years.
          @param periods {number[]} The periods per year/month/week/day/hour/minute/second.
          @return {number} The corresponding number of seconds.
          @example var secs = $.countdown.periodsToSeconds(periods) */
        periodsToSeconds: function (periods) {
          return periods[0] * 31557600 + periods[1] * 2629800 + periods[2] * 604800 +
            periods[3] * 86400 + periods[4] * 3600 + periods[5] * 60 + periods[6];
        },

        _instSettings: function (elem, options) {
          return { _periods: [0, 0, 0, 0, 0, 0, 0] };
        },

        /** Add an element to the list of active ones.
          @private
          @param elem {Element} The countdown element. */
        _addElem: function (elem) {
          if (!this._hasElem(elem)) {
            this._timerElems.push(elem);
          }
        },

        /** See if an element is in the list of active ones.
          @private
          @param elem {Element} The countdown element.
          @return {boolean} True if present, false if not. */
        _hasElem: function (elem) {
          return ($.inArray(elem, this._timerElems) > -1);
        },

        /** Remove an element from the list of active ones.
          @private
          @param elem {Element} The countdown element. */
        _removeElem: function (elem) {
          this._timerElems = $.map(this._timerElems,
            function (value) { return (value == elem ? null : value); }); // delete entry
        },

        /** Update each active timer element.
          @private */
        _updateElems: function () {
          for (var i = this._timerElems.length - 1; i >= 0; i--) {
            this._updateCountdown(this._timerElems[i]);
          }
        },

        _optionsChanged: function (elem, inst, options) {
          if (options.layout) {
            options.layout = options.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          }
          this._resetExtraLabels(inst.options, options);
          var timezoneChanged = (inst.options.timezone != options.timezone);
          $.extend(inst.options, options);
          this._adjustSettings(elem, inst,
            options.until != null || options.since != null || timezoneChanged);
          var now = new Date();
          if ((inst._since && inst._since < now) || (inst._until && inst._until > now)) {
            this._addElem(elem[0]);
          }
          this._updateCountdown(elem, inst);
        },

        /** Redisplay the countdown with an updated display.
          @private
          @param elem {Element|jQuery} The containing division.
          @param inst {object} The current settings for this instance. */
        _updateCountdown: function (elem, inst) {
          elem = elem.jquery ? elem : $(elem);
          inst = inst || this._getInst(elem);
          if (!inst) {
            return;
          }
          elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL);
          if ($.isFunction(inst.options.onTick)) {
            var periods = inst._hold != 'lap' ? inst._periods :
              this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
            if (inst.options.tickInterval == 1 ||
              this.periodsToSeconds(periods) % inst.options.tickInterval == 0) {
              inst.options.onTick.apply(elem[0], [periods]);
            }
          }
          var expired = inst._hold != 'pause' &&
            (inst._since ? inst._now.getTime() < inst._since.getTime() :
              inst._now.getTime() >= inst._until.getTime());
          if (expired && !inst._expiring) {
            inst._expiring = true;
            if (this._hasElem(elem[0]) || inst.options.alwaysExpire) {
              this._removeElem(elem[0]);
              if ($.isFunction(inst.options.onExpiry)) {
                inst.options.onExpiry.apply(elem[0], []);
              }
              if (inst.options.expiryText) {
                var layout = inst.options.layout;
                inst.options.layout = inst.options.expiryText;
                this._updateCountdown(elem[0], inst);
                inst.options.layout = layout;
              }
              if (inst.options.expiryUrl) {
                window.location = inst.options.expiryUrl;
              }
            }
            inst._expiring = false;
          }
          else if (inst._hold == 'pause') {
            this._removeElem(elem[0]);
          }
        },

        /** Reset any extra labelsn and compactLabelsn entries if changing labels.
          @private
          @param base {object} The options to be updated.
          @param options {object} The new option values. */
        _resetExtraLabels: function (base, options) {
          for (var n in options) {
            if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
              base[n] = options[n];
            }
          }
          for (var n in base) { // Remove custom numbered labels
            if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof options[n] === 'undefined') {
              base[n] = null;
            }
          }
        },

        /** Calculate internal settings for an instance.
          @private
          @param elem {jQuery} The containing division.
          @param inst {object} The current settings for this instance.
          @param recalc {boolean} True if until or since are set. */
        _adjustSettings: function (elem, inst, recalc) {
          var now;
          var serverOffset = 0;
          var serverEntry = null;
          for (var i = 0; i < this._serverSyncs.length; i++) {
            if (this._serverSyncs[i][0] == inst.options.serverSync) {
              serverEntry = this._serverSyncs[i][1];
              break;
            }
          }
          if (serverEntry != null) {
            serverOffset = (inst.options.serverSync ? serverEntry : 0);
            now = new Date();
          }
          else {
            var serverResult = ($.isFunction(inst.options.serverSync) ?
              inst.options.serverSync.apply(elem[0], []) : null);
            now = new Date();
            serverOffset = (serverResult ? now.getTime() - serverResult.getTime() : 0);
            this._serverSyncs.push([inst.options.serverSync, serverOffset]);
          }
          var timezone = inst.options.timezone;
          timezone = (timezone == null ? -now.getTimezoneOffset() : timezone);
          if (recalc || (!recalc && inst._until == null && inst._since == null)) {
            inst._since = inst.options.since;
            if (inst._since != null) {
              inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null));
              if (inst._since && serverOffset) {
                inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset);
              }
            }
            inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now));
            if (serverOffset) {
              inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset);
            }
          }
          inst._show = this._determineShow(inst);
        },

        /** Remove the countdown widget from a div.
          @param elem {jQuery} The containing division.
          @param inst {object} The current instance object. */
        _preDestroy: function (elem, inst) {
          this._removeElem(elem[0]);
          elem.empty();
        },

        /** Pause a countdown widget at the current time.
         Stop it running but remember and display the current time.
          @param elem {Element} The containing division.
          @example $(selector).countdown('pause') */
        pause: function (elem) {
          this._hold(elem, 'pause');
        },

        /** Pause a countdown widget at the current time.
         Stop the display but keep the countdown running.
          @param elem {Element} The containing division.
          @example $(selector).countdown('lap') */
        lap: function (elem) {
          this._hold(elem, 'lap');
        },

        /** Resume a paused countdown widget.
          @param elem {Element} The containing division.
          @example $(selector).countdown('resume') */
        resume: function (elem) {
          this._hold(elem, null);
        },

        /** Toggle a paused countdown widget.
          @param elem {Element} The containing division.
          @example $(selector).countdown('toggle') */
        toggle: function (elem) {
          var inst = $.data(elem, this.name) || {};
          this[!inst._hold ? 'pause' : 'resume'](elem);
        },

        /** Toggle a lapped countdown widget.
          @param elem {Element} The containing division.
          @example $(selector).countdown('toggleLap') */
        toggleLap: function (elem) {
          var inst = $.data(elem, this.name) || {};
          this[!inst._hold ? 'lap' : 'resume'](elem);
        },

        /** Pause or resume a countdown widget.
          @private
          @param elem {Element} The containing division.
          @param hold {string} The new hold setting. */
        _hold: function (elem, hold) {
          var inst = $.data(elem, this.name);
          if (inst) {
            if (inst._hold == 'pause' && !hold) {
              inst._periods = inst._savePeriods;
              var sign = (inst._since ? '-' : '+');
              inst[inst._since ? '_since' : '_until'] =
                this._determineTime(sign + inst._periods[0] + 'y' +
                  sign + inst._periods[1] + 'o' + sign + inst._periods[2] + 'w' +
                  sign + inst._periods[3] + 'd' + sign + inst._periods[4] + 'h' +
                  sign + inst._periods[5] + 'm' + sign + inst._periods[6] + 's');
              this._addElem(elem);
            }
            inst._hold = hold;
            inst._savePeriods = (hold == 'pause' ? inst._periods : null);
            $.data(elem, this.name, inst);
            this._updateCountdown(elem, inst);
          }
        },

        /** Return the current time periods.
          @param elem {Element} The containing division.
          @return {number[]} The current periods for the countdown.
          @example var periods = $(selector).countdown('getTimes') */
        getTimes: function (elem) {
          var inst = $.data(elem, this.name);
          return (!inst ? null : (inst._hold == 'pause' ? inst._savePeriods : (!inst._hold ? inst._periods :
            this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()))));
        },

        /** A time may be specified as an exact value or a relative one.
          @private
          @param setting {string|number|Date} The date/time value as a relative or absolute value.
          @param defaultTime {Date} The date/time to use if no other is supplied.
          @return {Date} The corresponding date/time. */
        _determineTime: function (setting, defaultTime) {
          var self = this;
          var offsetNumeric = function (offset) { // e.g. +300, -2
            var time = new Date();
            time.setTime(time.getTime() + offset * 1000);
            return time;
          };
          var offsetString = function (offset) { // e.g. '+2d', '-4w', '+3h +30m'
            offset = offset.toLowerCase();
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth();
            var day = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
            var matches = pattern.exec(offset);
            while (matches) {
              switch (matches[2] || 's') {
                case 's': second += parseInt(matches[1], 10); break;
                case 'm': minute += parseInt(matches[1], 10); break;
                case 'h': hour += parseInt(matches[1], 10); break;
                case 'd': day += parseInt(matches[1], 10); break;
                case 'w': day += parseInt(matches[1], 10) * 7; break;
                case 'o':
                  month += parseInt(matches[1], 10);
                  day = Math.min(day, self._getDaysInMonth(year, month));
                  break;
                case 'y':
                  year += parseInt(matches[1], 10);
                  day = Math.min(day, self._getDaysInMonth(year, month));
                  break;
              }
              matches = pattern.exec(offset);
            }
            return new Date(year, month, day, hour, minute, second, 0);
          };
          var time = (setting == null ? defaultTime :
            (typeof setting == 'string' ? offsetString(setting) :
              (typeof setting == 'number' ? offsetNumeric(setting) : setting)));
          if (time) time.setMilliseconds(0);
          return time;
        },

        /** Determine the number of days in a month.
          @private
          @param year {number} The year.
          @param month {number} The month.
          @return {number} The days in that month. */
        _getDaysInMonth: function (year, month) {
          return 32 - new Date(year, month, 32).getDate();
        },

        /** Default implementation to determine which set of labels should be used for an amount.
          Use the <code>labels</code> attribute with the same numeric suffix (if it exists).
          @private
          @param num {number} The amount to be displayed.
          @return {number} The set of labels to be used for this amount. */
        _normalLabels: function (num) {
          return num;
        },

        /** Generate the HTML to display the countdown widget.
          @private
          @param inst {object} The current settings for this instance.
          @return {string} The new HTML for the countdown display. */
        _generateHTML: function (inst) {
          var self = this;
          // Determine what to show
          inst._periods = (inst._hold ? inst._periods :
            this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()));
          // Show all 'asNeeded' after first non-zero value
          var shownNonZero = false;
          var showCount = 0;
          var sigCount = inst.options.significant;
          var show = $.extend({}, inst._show);
          for (var period = Y; period <= S; period++) {
            shownNonZero != (inst._show[period] == '?' && inst._periods[period] > 0);
            show[period] = (inst._show[period] == '?' && !shownNonZero ? null : inst._show[period]);
            showCount += (show[period] ? 1 : 0);
            sigCount -= (inst._periods[period] > 0 ? 1 : 0);
          }
          var showSignificant = [false, false, false, false, false, false, false];
          for (var period = S; period >= Y; period--) { // Determine significant periods
            if (inst._show[period]) {
              if (inst._periods[period]) {
                showSignificant[period] = true;
              }
              else {
                showSignificant[period] = sigCount > 0;
                sigCount--;
              }
            }
          }
          var labels = (inst.options.compact ? inst.options.compactLabels : inst.options.labels);
          var whichLabels = inst.options.whichLabels || this._normalLabels;
          var showCompact = function (period) {
            var labelsNum = inst.options['compactLabels' + whichLabels(inst._periods[period])];
            return (show[period] ? self._translateDigits(inst, inst._periods[period]) +
              (labelsNum ? labelsNum[period] : labels[period]) + ' ' : '');
          };
          var minDigits = (inst.options.padZeroes ? 2 : 1);
          var showFull = function (period) {
            var labelsNum = inst.options['labels' + whichLabels(inst._periods[period])];
            return ((!inst.options.significant && show[period]) ||
              (inst.options.significant && showSignificant[period]) ?
              '<span class="' + self._sectionClass + '">' +
              '<span class="' + self._amountClass + '">' +
              self._minDigits(inst, inst._periods[period], minDigits) + '</span>' +
              '<span class="' + self._periodClass + '">' +
              (labelsNum ? labelsNum[period] : labels[period]) + '</span></span>' : '');
          };
          return (inst.options.layout ? this._buildLayout(inst, show, inst.options.layout,
            inst.options.compact, inst.options.significant, showSignificant) :
            ((inst.options.compact ? // Compact version
              '<span class="' + this._rowClass + ' ' + this._amountClass +
              (inst._hold ? ' ' + this._holdingClass : '') + '">' +
              showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) +
              (show[H] ? this._minDigits(inst, inst._periods[H], 2) : '') +
              (show[M] ? (show[H] ? inst.options.timeSeparator : '') +
                this._minDigits(inst, inst._periods[M], 2) : '') +
              (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator : '') +
                this._minDigits(inst, inst._periods[S], 2) : '') :
              // Full version
              '<span class="' + this._rowClass + ' ' + this._showClass + (inst.options.significant || showCount) +
              (inst._hold ? ' ' + this._holdingClass : '') + '">' +
              showFull(Y) + showFull(O) + showFull(W) + showFull(D) +
              showFull(H) + showFull(M) + showFull(S)) + '</span>' +
              (inst.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' +
                inst.options.description + '</span>' : '')));
        },

        /** Construct a custom layout.
          @private
          @param inst {object} The current settings for this instance.
          @param show {boolean[]} Flags indicating which periods are requested.
          @param layout {string} The customised layout.
          @param compact {boolean} True if using compact labels.
          @param significant {number} The number of periods with values to show, zero for all.
          @param showSignificant {boolean[]} Other periods to show for significance.
          @return {string} The custom HTML. */
        _buildLayout: function (inst, show, layout, compact, significant, showSignificant) {
          var labels = inst.options[compact ? 'compactLabels' : 'labels'];
          var whichLabels = inst.options.whichLabels || this._normalLabels;
          var labelFor = function (index) {
            return (inst.options[(compact ? 'compactLabels' : 'labels') +
              whichLabels(inst._periods[index])] || labels)[index];
          };
          var digit = function (value, position) {
            return inst.options.digits[Math.floor(value / position) % 10];
          };
          var subs = {
            desc: inst.options.description, sep: inst.options.timeSeparator,
            yl: labelFor(Y), yn: this._minDigits(inst, inst._periods[Y], 1),
            ynn: this._minDigits(inst, inst._periods[Y], 2),
            ynnn: this._minDigits(inst, inst._periods[Y], 3), y1: digit(inst._periods[Y], 1),
            y10: digit(inst._periods[Y], 10), y100: digit(inst._periods[Y], 100),
            y1000: digit(inst._periods[Y], 1000),
            ol: labelFor(O), on: this._minDigits(inst, inst._periods[O], 1),
            onn: this._minDigits(inst, inst._periods[O], 2),
            onnn: this._minDigits(inst, inst._periods[O], 3), o1: digit(inst._periods[O], 1),
            o10: digit(inst._periods[O], 10), o100: digit(inst._periods[O], 100),
            o1000: digit(inst._periods[O], 1000),
            wl: labelFor(W), wn: this._minDigits(inst, inst._periods[W], 1),
            wnn: this._minDigits(inst, inst._periods[W], 2),
            wnnn: this._minDigits(inst, inst._periods[W], 3), w1: digit(inst._periods[W], 1),
            w10: digit(inst._periods[W], 10), w100: digit(inst._periods[W], 100),
            w1000: digit(inst._periods[W], 1000),
            dl: labelFor(D), dn: this._minDigits(inst, inst._periods[D], 1),
            dnn: this._minDigits(inst, inst._periods[D], 2),
            dnnn: this._minDigits(inst, inst._periods[D], 3), d1: digit(inst._periods[D], 1),
            d10: digit(inst._periods[D], 10), d100: digit(inst._periods[D], 100),
            d1000: digit(inst._periods[D], 1000),
            hl: labelFor(H), hn: this._minDigits(inst, inst._periods[H], 1),
            hnn: this._minDigits(inst, inst._periods[H], 2),
            hnnn: this._minDigits(inst, inst._periods[H], 3), h1: digit(inst._periods[H], 1),
            h10: digit(inst._periods[H], 10), h100: digit(inst._periods[H], 100),
            h1000: digit(inst._periods[H], 1000),
            ml: labelFor(M), mn: this._minDigits(inst, inst._periods[M], 1),
            mnn: this._minDigits(inst, inst._periods[M], 2),
            mnnn: this._minDigits(inst, inst._periods[M], 3), m1: digit(inst._periods[M], 1),
            m10: digit(inst._periods[M], 10), m100: digit(inst._periods[M], 100),
            m1000: digit(inst._periods[M], 1000),
            sl: labelFor(S), sn: this._minDigits(inst, inst._periods[S], 1),
            snn: this._minDigits(inst, inst._periods[S], 2),
            snnn: this._minDigits(inst, inst._periods[S], 3), s1: digit(inst._periods[S], 1),
            s10: digit(inst._periods[S], 10), s100: digit(inst._periods[S], 100),
            s1000: digit(inst._periods[S], 1000)
          };
          var html = layout;
          // Replace period containers: {p<}...{p>}
          for (var i = Y; i <= S; i++) {
            var period = 'yowdhms'.charAt(i);
            var re = new RegExp('\\{' + period + '<\\}([\\s\\S]*)\\{' + period + '>\\}', 'g');
            html = html.replace(re, ((!significant && show[i]) ||
              (significant && showSignificant[i]) ? '$1' : ''));
          }
          // Replace period values: {pn}
          $.each(subs, function (n, v) {
            var re = new RegExp('\\{' + n + '\\}', 'g');
            html = html.replace(re, v);
          });
          return html;
        },

        /** Ensure a numeric value has at least n digits for display.
          @private
          @param inst {object} The current settings for this instance.
          @param value {number} The value to display.
          @param len {number} The minimum length.
          @return {string} The display text. */
        _minDigits: function (inst, value, len) {
          value = '' + value;
          if (value.length >= len) {
            return this._translateDigits(inst, value);
          }
          value = '0000000000' + value;
          return this._translateDigits(inst, value.substr(value.length - len));
        },

        /** Translate digits into other representations.
          @private
          @param inst {object} The current settings for this instance.
          @param value {string} The text to translate.
          @return {string} The translated text. */
        _translateDigits: function (inst, value) {
          return ('' + value).replace(/[0-9]/g, function (digit) {
            return inst.options.digits[digit];
          });
        },

        /** Translate the format into flags for each period.
          @private
          @param inst {object} The current settings for this instance.
          @return {string[]} Flags indicating which periods are requested (?) or
              required (!) by year, month, week, day, hour, minute, second. */
        _determineShow: function (inst) {
          var format = inst.options.format;
          var show = [];
          show[Y] = (format.match('y') ? '?' : (format.match('Y') ? '!' : null));
          show[O] = (format.match('o') ? '?' : (format.match('O') ? '!' : null));
          show[W] = (format.match('w') ? '?' : (format.match('W') ? '!' : null));
          show[D] = (format.match('d') ? '?' : (format.match('D') ? '!' : null));
          show[H] = (format.match('h') ? '?' : (format.match('H') ? '!' : null));
          show[M] = (format.match('m') ? '?' : (format.match('M') ? '!' : null));
          show[S] = (format.match('s') ? '?' : (format.match('S') ? '!' : null));
          return show;
        },

        /** Calculate the requested periods between now and the target time.
          @private
          @param inst {object} The current settings for this instance.
          @param show {string[]} Flags indicating which periods are requested/required.
          @param significant {number} The number of periods with values to show, zero for all.
          @param now {Date} The current date and time.
          @return {number[]} The current time periods (always positive)
              by year, month, week, day, hour, minute, second. */
        _calculatePeriods: function (inst, show, significant, now) {
          // Find endpoints
          inst._now = now;
          inst._now.setMilliseconds(0);
          var until = new Date(inst._now.getTime());
          if (inst._since) {
            if (now.getTime() < inst._since.getTime()) {
              inst._now = now = until;
            }
            else {
              now = inst._since;
            }
          }
          else {
            until.setTime(inst._until.getTime());
            if (now.getTime() > inst._until.getTime()) {
              inst._now = now = until;
            }
          }
          // Calculate differences by period
          var periods = [0, 0, 0, 0, 0, 0, 0];
          if (show[Y] || show[O]) {
            // Treat end of months as the same
            var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth());
            var lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth());
            var sameDay = (until.getDate() == now.getDate() ||
              (until.getDate() >= Math.min(lastNow, lastUntil) &&
                now.getDate() >= Math.min(lastNow, lastUntil)));
            var getSecs = function (date) {
              return (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
            };
            var months = Math.max(0,
              (until.getFullYear() - now.getFullYear()) * 12 + until.getMonth() - now.getMonth() +
              ((until.getDate() < now.getDate() && !sameDay) ||
                (sameDay && getSecs(until) < getSecs(now)) ? -1 : 0));
            periods[Y] = (show[Y] ? Math.floor(months / 12) : 0);
            periods[O] = (show[O] ? months - periods[Y] * 12 : 0);
            // Adjust for months difference and end of month if necessary
            now = new Date(now.getTime());
            var wasLastDay = (now.getDate() == lastNow);
            var lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y],
              now.getMonth() + periods[O]);
            if (now.getDate() > lastDay) {
              now.setDate(lastDay);
            }
            now.setFullYear(now.getFullYear() + periods[Y]);
            now.setMonth(now.getMonth() + periods[O]);
            if (wasLastDay) {
              now.setDate(lastDay);
            }
          }
          var diff = Math.floor((until.getTime() - now.getTime()) / 1000);
          var extractPeriod = function (period, numSecs) {
            periods[period] = (show[period] ? Math.floor(diff / numSecs) : 0);
            diff -= periods[period] * numSecs;
          };
          extractPeriod(W, 604800);
          extractPeriod(D, 86400);
          extractPeriod(H, 3600);
          extractPeriod(M, 60);
          extractPeriod(S, 1);
          if (diff > 0 && !inst._since) { // Round up if left overs
            var multiplier = [1, 12, 4.3482, 7, 24, 60, 60];
            var lastShown = S;
            var max = 1;
            for (var period = S; period >= Y; period--) {
              if (show[period]) {
                if (periods[lastShown] >= max) {
                  periods[lastShown] = 0;
                  diff = 1;
                }
                if (diff > 0) {
                  periods[period]++;
                  diff = 0;
                  lastShown = period;
                  max = 1;
                }
              }
              max *= multiplier[period];
            }
          }
          if (significant) { // Zero out insignificant periods
            for (var period = Y; period <= S; period++) {
              if (significant && periods[period]) {
                significant--;
              }
              else if (!significant) {
                periods[period] = 0;
              }
            }
          }
          return periods;
        }
      });

    })(jQuery);

    $(function () {
      var austDay = new Date();
      austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 0);
      $('#defaultCountdown').countdown({until: austDay});
      $('#year').text(austDay.getFullYear());
    });
  }


  submitWithdraw() {
    console.log(this.messageconnection)
    let formData = new FormData();
    formData.set("receiver_id", this.to_user_id);
    formData.set("connection_id", this.messageconnection);
    formData.set("message_type", '8');
    formData.set("message", 'Project withdraw');

    this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res && res.status == 200) {
        this.toastr.success(res.message ? res.message : 'Successfully withdraw.');
      } else {
        this.toastr.error(res.message ? res.message : 'Please try after sometime.');
      }
      $('#withdrawProjModal').modal('hide');
    }, err => {
      console.log(err);
    });
  }

  submitProject() {
    console.log(this.selectedValue);
    console.log(this.messageconnection);
    this.submitted = true;

    console.log("submit", this.submitForm);

    if (this.submitForm.invalid) {
      return;
    } else {
      console.log(this.messageconnection)
      let formData = new FormData();
      formData.set("receiver_id", this.to_user_id);
      formData.set("connection_id", this.messageconnection);
      formData.set("message_type", '3');
      formData.set("message", this.submitForm.value.body);

      this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
        console.log(res);
        if (res && res.status == 200) {
          this.toastr.success(res.message ? res.message : 'Successfully submitted.');
        } else {
          this.toastr.error(res.message ? res.message : 'Please try after sometime.');
        }
        $('#submitProjModal').modal('hide');
      }, err => {
        console.log(err);
      });
    }
  }

  addRating() {
    this.submitted1 = true;

    console.log("submit", this.ratingForm);

    if (this.ratingForm.invalid) {
      return;
    } else {
      let formData = new FormData();
      formData.set("job_id", this.jobDetails.id);
      formData.set("rating", this.selectedValue.toString());
      formData.set("review", this.ratingForm.value.body);
      this.apiService.addReview(this.token, formData).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success(res.message ? res.message : 'Successfully submitted the rating');
        }else{
          this.toastr.error(res.message ? res.message : 'Please try after sometime.');
        }
        this.ratingForm.reset();
        this.submitted1 = false;
        $('#reviewProjModal').modal('hide');
      }, err => {
        console.log(err);
      })
    }
  }

  completed() {
    console.log(this.messageconnection)
    let formData = new FormData();
    formData.set("receiver_id", this.to_user_id);
    formData.set("connection_id", this.messageconnection);
    formData.set("message_type", '9');
    formData.set("message", 'Project completed');

    this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res && res.status == 200) {
        this.toastr.success(res.message ? res.message : 'Successfully completed.');
      } else {
        this.toastr.error(res.message ? res.message : 'Please try after sometime.');
      }
      $('#completedProjModal').modal('hide');
    }, err => {
      console.log(err);
    });
  }

}
