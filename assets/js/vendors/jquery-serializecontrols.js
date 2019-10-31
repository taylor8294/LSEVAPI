;(function ( $, window, document, undefined ) {
    
    $.fn.serializeControls = function(callback) {
        var data = {};

        function buildInputObject(arr, val) {
            if (arr.length < 1) return val;  
            var objkey = arr[0];
            if (objkey.slice(-1) == "]") objkey = objkey.slice(0,-1);
            var result = {};
            if (arr.length == 1) result[objkey] = val;
            else {
                arr.shift();
                var nestedVal = buildInputObject(arr,val);
                result[objkey] = nestedVal;
            }
            return result;
        }

        $.each(this.serializeArray(), function() {
            var val = this.value;
            var c = this.name.split("[");
            var a = buildInputObject(c, val);
            $.extend(true, data, a);
        });
        
        if(callback && typeof callback === "function") {
            (async function(){
                callback(data);
            })()
            return this;
        } else return data;
    }

})( jQuery, window, document );