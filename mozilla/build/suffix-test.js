
// Cached so it still exists during cleanup until we need it to
let localDefine;

const TEST_URI = "data:text/html;charset=utf-8,gcli-web";

function test() {
  localDefine = define;

  DeveloperToolbarTest.test(TEST_URI, function(browser, tab) {
    var gclitest = define.globalDomain.require("gclitest/index");
    gclitest.run({
      display: DeveloperToolbar.display,
      // window: browser.getBrowser().contentWindow
    });

    finish();
  });
}

registerCleanupFunction(function() {
  testModuleNames.forEach(function(moduleName) {
    delete localDefine.modules[moduleName];
    delete localDefine.globalDomain.modules[moduleName];
  });

  localDefine = undefined;
});
