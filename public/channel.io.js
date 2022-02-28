(function () {
    var w = window;
    if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () {})(
            "ChannelIO script included twice."
        );
    }
    // eslint-disable-next-line no-unused-vars
    var d = window.document;
    var ch = function () {
        ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
        ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
        if (w.ChannelIOInitialized) {
            return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        s.charset = "UTF-8";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === "complete") {
        l();
    } else if (window.attachEvent) {
        window.attachEvent("onload", l);
    } else {
        window.addEventListener("DOMContentLoaded", l, false);
        window.addEventListener("load", l, false);
    }
})();

// eslint-disable-next-line no-undef
ChannelIO("boot", {
    pluginKey: "30b86b65-67dc-4102-9ead-ef80f8f5e18a",
});
