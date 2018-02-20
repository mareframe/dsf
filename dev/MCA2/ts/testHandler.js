var Mareframe;
(function (Mareframe) {
    var DST;
    (function (DST) {
        var TestHandler = (function () {
            function TestHandler() {
                var elm1 = new DST.ElementOOBase("hello");
                var elm2 = new DST.ElementOOBase("world");
                var w1 = elm1.getName();
                var w2 = elm2.getName();
                elm1.setName("newNmae");
                var w3 = elm1.getName();
            }
            return TestHandler;
        }());
        DST.TestHandler = TestHandler;
    })(DST = Mareframe.DST || (Mareframe.DST = {}));
})(Mareframe || (Mareframe = {}));
//# sourceMappingURL=testHandler.js.map