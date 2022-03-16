/**
  * vee-validate v4.1.0
  * (c) 2021 Abdelrahman Awad
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VeeValidateI18n = {}));
}(this, (function (exports) { 'use strict';

  function isCallable(fn) {
      return typeof fn === 'function';
  }
  const isObject = (obj) => obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);
  function merge(target, source) {
      Object.keys(source).forEach(key => {
          if (isObject(source[key])) {
              if (!target[key]) {
                  target[key] = {};
              }
              merge(target[key], source[key]);
              return;
          }
          target[key] = source[key];
      });
      return target;
  }

  /**
   * Replaces placeholder values in a string with their actual values
   */
  function interpolate(template, values) {
      return template.replace(/(\d:)?{([^}]+)}/g, function (_, param, placeholder) {
          if (!param || !values.params) {
              return placeholder in values
                  ? values[placeholder]
                  : values.params && placeholder in values.params
                      ? values.params[placeholder]
                      : `{${placeholder}}`;
          }
          // Handles extended object params format
          if (!Array.isArray(values.params)) {
              return placeholder in values.params ? values.params[placeholder] : `{${placeholder}}`;
          }
          // Extended Params exit in the format of `paramIndex:{paramName}` where the index is optional
          const paramIndex = Number(param.replace(':', ''));
          return paramIndex in values.params ? values.params[paramIndex] : `${param}{${placeholder}}`;
      });
  }

  class Dictionary {
      constructor(locale, dictionary) {
          this.container = {};
          this.locale = locale;
          this.merge(dictionary);
      }
      resolve(ctx) {
          return this.format(this.locale, ctx);
      }
      format(locale, ctx) {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          let message;
          const { field, rule, form } = ctx;
          if (!rule) {
              return `${field} is not valid`;
          }
          // find if specific message for that field was specified.
          message = ((_c = (_b = (_a = this.container[locale]) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b[field]) === null || _c === void 0 ? void 0 : _c[rule.name]) || ((_e = (_d = this.container[locale]) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e[rule.name]);
          if (!message) {
              message = `${field} is not valid`;
          }
          const fieldName = (_h = (_g = (_f = this.container[locale]) === null || _f === void 0 ? void 0 : _f.names) === null || _g === void 0 ? void 0 : _g[field]) !== null && _h !== void 0 ? _h : field;
          return isCallable(message)
              ? message(ctx)
              : interpolate(message, Object.assign(Object.assign({}, form), { field: fieldName, params: rule.params }));
      }
      merge(dictionary) {
          merge(this.container, dictionary);
      }
  }
  let DICTIONARY;
  function localize(locale, dictionary) {
      if (!DICTIONARY) {
          DICTIONARY = new Dictionary('en', {});
      }
      const generateMessage = ctx => {
          return DICTIONARY.resolve(ctx);
      };
      if (typeof locale === 'string') {
          DICTIONARY.locale = locale;
          if (dictionary) {
              DICTIONARY.merge({ [locale]: dictionary });
          }
          return generateMessage;
      }
      DICTIONARY.merge(locale);
      return generateMessage;
  }
  /**
   * Sets the locale
   */
  function setLocale(locale) {
      DICTIONARY.locale = locale;
  }
  /**
   * Loads a locale file from URL and merges it with the current dictionary
   */
  async function loadLocaleFromURL(url) {
      try {
          const locale = await fetch(url, {
              headers: {
                  'content-type': 'application/json',
              },
          }).then(res => res.json());
          if (!locale.code) {
              console.error('Could not identify locale, ensure the locale file contains `code` field');
              return;
          }
          localize({ [locale.code]: locale });
      }
      catch (err) {
          console.error(`Failed to load locale `);
      }
  }

  exports.loadLocaleFromURL = loadLocaleFromURL;
  exports.localize = localize;
  exports.setLocale = setLocale;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
