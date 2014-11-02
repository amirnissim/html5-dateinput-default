(function DateInputDefault() {
    var msDay = 24 * 60 * 60 * 1000;
    var pattern = /(\d+)([dwmy])/;

    function parse(str) {
        var match = pattern.exec(str);
        if (match && match.length === 3) {
            var count = match[1];
            var type = match[2];
            var d = new Date();
            switch (type) {
                case 'y':
                    d.setFullYear(d.getFullYear() + count);
                    break;
                case 'm':
                    d.setMonth((d.getMonth() + 1 + count) % 12);
                    break;
                case 'w':
                    d.setMilliseconds(d.getMilliseconds() + count * 7 * msDay);
                    break;
                case 'd':
                    d.setMilliseconds(d.getMilliseconds() + count * msDay);
                    break;
            }
            return d;

            return undefined;
        };
    }

    function TestSuite() {
        var cases = ['1d', '1w'];
        var expected = [
            new Date((new Date()).setMilliseconds((new Date().getMilliseconds() + msDay))),
            new Date((new Date()).setMilliseconds((new Date().getMilliseconds() + msDay * 7)))
        ];

        cases.forEach(function(str, i) {
            var d = parse(str);
            var a = d.toJSON().slice(0, 10);
            var b = expected[i].toJSON().slice(0, 10);

            if (a === b) {
                console.log('PASS', str);
            } else {
                console.error('FAIL', str, 'expected:', b, 'got:', a);
            }
        });
    }

    TestSuite();


    var inputs = document.querySelectorAll('input[type="date"][data-default]');
    for (var i = 0, l = inputs.length; i < l; i++) {
        var input = inputs[i];
        var d = parse(input.datasest.default);
        if (d) {
            input.value = d.toJSON().slice(0, 10);
        }
    }

})();
