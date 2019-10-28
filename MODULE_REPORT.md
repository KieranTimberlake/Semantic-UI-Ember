## Module Report
### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\components\ui-radio.js` at line 20

```js
    if (Ember.isBlank(this.get('name'))) {
      this.set('name', 'default');
      Ember.Logger.warn("The required component parameter of 'name' was not passed into the ui-radio component");
    }
  },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\components\ui-dropdown.js` at line 155

```js
      let keys = [];
      if (!isMultiple) {
        Ember.Logger.error("Selected is an array of values, but the dropdown doesn't have the class 'multiple'");
        return;
      }
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\mixins\base.js` at line 27

```js

    if (Ember.isBlank(this.getSemanticModuleName())) {
      return Ember.Logger.error('A module was not declared on semantic extended type');
    }
    this.set('_initialized', false);
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\mixins\base.js` at line 135

```js
      module.call(this.getSemanticScope(), this._settings());
    } else {
      Ember.Logger.error(`The Semantic UI module ${this.getSemanticModuleName()} was not found and did not initialize`);
    }
  },
```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\mixins\base.js` at line 166

```js
      return module.apply(this.getSemanticScope(), arguments);
    }
    Ember.Logger.warn("The execute method was called, but the Semantic-UI module didn't exist.");
  },

```

### Unknown Global

**Global**: `Ember.Logger`

**Location**: `addon\mixins\base.js` at line 199

```js
    let moduleGlobal = this.getSemanticModuleGlobal();
    if (!moduleGlobal) {
      Ember.Logger.error(`Unable to find jQuery Semantic UI module: ${moduleName}`);
      return;
    }
```
