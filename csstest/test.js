/* promise based getFilter to accommodate getting surrounding suburbs */
oSearchResult.fPromiseOfFilterSetting = function fPromiseOfFilterSetting(sId) {
    var self = this;
    self.oPromiseCache = self.oPromiseCache || {}; // creates a persistent cache
                                                   // across function calls
    var oDeferred = $.Deferred(); // `new` keyword is optional
    var oPromise = oDeferred.promise();

    // leverage the cache (it's ok if promise is still pending), you can key
    if (self.oPromiseCache[sId] !== undefined) {
        return self.oPromiseCache[sId];
    }
    else {
        self.oPromiseCache[sId] = oPromise;
    }

    // do our asynchronous action below which at some point calls
    // defered.resolve(...) and hence complete our promise
    $.cmsRestProxy.doAjaxServiceRequest('ocms_searchProperties_Extension', {
        action : 'getSurroundingSuburbs',
        sSuburbIds : 'a0RO0000003BwWeMAK'
    }, function(result, json) {
        console.log("doAjaxServiceRequest(
                       'ocms_searchProperties_Extension')", json);
        oDeferred.resolve(json); // `json` is our result and `.resolve(json)`
                                 // passes the value as first argument to
                                 // the `oPromise.done`, `oPromise.fail`
                                 // and `oPromise.always` callback functions
    })

    // We can now return the promise or attach optional `oPromise.done`,
    // `oPromise.fail`, and `oPromise.always` callbacks which will execute first
    // in the chain.
    //
    // Note that `oPromise.then(doneCallback, failCallback, alwaysCallback)`
    // is short form for the below
    oPromise.done(function(value) { // returned by promise.resolve(...); call
        console.log('will run if this Promise is resolved.', value);
    })
    oPromise.fail(function(value) {
        console.log("will run if this Promise is rejected.", value);
    });
    oPromise.always(function(value) {
        console.log("this will run either way.", value);
    });

    // return a promise instead of deferred object so that
    // outside code cannot reject/resolve it
    return oPromise;
}

// then to use one would do
oSearchResult.fPromiseOfFilterSetting().done(function(value) {alert(value)});

// or using $.when chaining
$.when(
    oSearchResult.fPromiseOfFilterSetting()
)
.done(
      function fDoneCallback(arg1, arg2, argN) {
          console.debug(arguments) // `arguments` is an array of all args collected
      }
);
