/**
* @ngdoc service
* @name $timeout
*
* @description
* Angular's wrapper for `window.setTimeout`. The `fn` function is wrapped into a try/catch
* block and delegates any exceptions to
* {@link ng.$exceptionHandler $exceptionHandler} service.
*
* The return value of calling `$timeout` is a promise, which will be resolved when
* the delay has passed and the timeout function, if provided, is executed.
*
* To cancel a timeout request, call `$timeout.cancel(promise)`.
*
* In tests you can use {@link ngMock.$timeout `$timeout.flush()`} to
* synchronously flush the queue of deferred functions.
*
* If you only want a promise that will be resolved after some specified delay
* then you can call `$timeout` without the `fn` function.
*
* @param {function()=} fn A function, whose execution should be delayed.
* @param {number=} [delay=0] Delay in milliseconds.
* @param {boolean=} [invokeApply=true] If set to `false` skips model dirty checking, otherwise
*   will invoke `fn` within the {@link ng.$rootScope.Scope#$apply $apply} block.
* @param {...*=} Pass additional parameters to the executed function.
* @returns {Promise} Promise that will be resolved when the timeout is reached. The promise
*   will be resolved with the return value of the `fn` function.
*
*/

// From:
// - https://github.com/angular/angular.js/blob/master/src/ng/browser.js
// - https://github.com/angular/angular.js/blob/master/src/ng/timeout.js

var outstandingRequestCount = 0;
var outstandingRequestCallbacks = [];

function completeOutstandingRequest(fn) {
try {
  fn.apply(null, sliceArgs(arguments, 1));
} finally {
  outstandingRequestCount--;
  if (outstandingRequestCount === 0) {
    while (outstandingRequestCallbacks.length) {
      try {
        outstandingRequestCallbacks.pop()();
      } catch (e) {
        console.error(e);
      }
    }
  }
}
}

var location = window.location,
  history = window.history,
  setTimeout = window.setTimeout,
  clearTimeout = window.clearTimeout,
  pendingDeferIds = {};

let browserDefer = function(fn, delay) {
var timeoutId;
outstandingRequestCount++;
timeoutId = setTimeout(function() {
  delete pendingDeferIds[timeoutId];
  completeOutstandingRequest(fn);
}, delay || 0);
pendingDeferIds[timeoutId] = true;
return timeoutId;
};

export default function timeout(fn, delay, invokeApply) {
  if (!isFunction(fn)) {
    invokeApply = delay;
    delay = fn;
    fn = noop;
  }

  var args = sliceArgs(arguments, 3),
      skipApply = (isDefined(invokeApply) && !invokeApply),
      deferred = (skipApply ? $$q : $q).defer(),
      promise = deferred.promise,
      timeoutId;

  timeoutId = browserDefer(function() {
    try {
      deferred.resolve(fn.apply(null, args));
    } catch (e) {
      deferred.reject(e);
      // $exceptionHandler(e);
    }
    finally {
      delete deferreds[promise.$$timeoutId];
    }

    if (!skipApply) $rootScope.$apply();
  }, delay);

  promise.$$timeoutId = timeoutId;
  deferreds[timeoutId] = deferred;

  return promise;
}