updateQueryParam = (paramName, newValue) => {
  const url = new URL(window.location)
  url.searchParams.set(paramName, newValue);
  window.history.replaceState({}, '', url);
};

document.addEventListener('alpine:init', () => {
  // allow an html elelemnt with attribute `x-query-string-bool='paramName'`
  // to have its state sync with a url parameter named paramName
  Alpine.directive('query-string-bool', (el, { modifiers, expression }, { evaluate }) => {
    const urlParams = new URLSearchParams(window.location.search)

    const paramName = modifiers[0] || expression;
    const initialValue = urlParams.get(paramName) ?? evaluate(expression);

    Alpine.bind(el, {
      'x-data'() {
        return {
          init() {
            if (initialValue == 'true') {
              this[expression] = true
            }
            this.$watch(expression, (value) => {
              updateQueryParam(paramName, value)
            })
          },
        }
      },
    })
  })

  // allow an html elelemnt with attribute `x-query-string-bool='paramName'`
  // to have its state sync with a url parameter named paramName
  Alpine.directive('query-string-int', (el, { modifiers, expression }, { evaluate }) => {
    const urlParams = new URLSearchParams(window.location.search)

    const paramName = modifiers[0] || expression;
    const initialValue = urlParams.get(paramName) ?? evaluate(expression);

    Alpine.bind(el, {
      'x-data'() {
        return {
          init() {
            if (initialValue) {
              this[expression] = parseInt(initialValue)
            }
            this.$watch(expression, (value) => {
              updateQueryParam(paramName, value)
            })
          },
        }
      },
    })
  })

  // allow an html elelemnt with attribute `x-query-string-bool='paramName'`
  // to have its state sync with a url parameter named paramName
  Alpine.directive('query-string', (el, { modifiers, expression }, { evaluate }) => {
    const urlParams = new URLSearchParams(window.location.search)

    const paramName = modifiers[0] || expression;
    const initialValue = urlParams.get(paramName) ?? evaluate(expression);

    Alpine.bind(el, {
      'x-data'() {
        return {
          init() {
            if (initialValue) {
              console.log('expression', expression, 'initialValue', initialValue)
              this[expression] = initialValue
            }
            this.$watch(expression, (value) => {
              updateQueryParam(paramName, value)
            })
          },
        }
      },
    })
  })

  Alpine.store('columnsDisplay', {
    buyFrom: true,
    brand: true,
    capacity: true,
    price: true,
    price_per_gb: true,
    format: true,
    suitableFor: true,
    sd_type: true,
    speed_class: true,
    speed_rw: true,
    condition: true,
    eta: true,
    rating: true,
    link: true,

    toggle(column) {
      if((column in this)) {
        this[column] = !this[column]
      }
    }
  })

  Alpine.data('rangeSlider', function(name, initMin, initMax) {
    let data = {
      min: initMin,
      max: initMax,
      percent1: function(){
        return (this[`${name}_min`] / this.max) * 100;
      },
      percent2: function(){
        return (this[`${name}_max`] / this.max) * 100;
      },
      slideOne: function(){
        if(parseInt(this[`${name}_max`]) - parseInt(this[`${name}_min`]) <= 0){
          this[`${name}_min`] = parseInt(this[`${name}_max`]) - 0;
        }
      },
      slideTwo: function(){
        if(parseInt(this[`${name}_max`]) - parseInt(this[`${name}_min`]) <= 0){
          this[`${name}_max`] = parseInt(this[`${name}_min`]) + 0;
        }
      }
    }
    data[`${name}_min`] = parseInt(new URLSearchParams(location.search).get(`${name}_min`)) || initMin
    data[`${name}_max`] = parseInt(new URLSearchParams(location.search).get(`${name}_max`)) || initMax
    return data
  })
})