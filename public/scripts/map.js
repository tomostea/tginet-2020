//import 'leaflet/dist/leaflet.css'; //<--------------add this line

const app = new Vue({
    el: '#app',
    template: `
    <div style="padding-left:10px">

    <div class="radio-inline">
    <label>
        <input type="radio" name="gender" value="man" style="margin-left:10px">タイプ1
    </label>
    <label>
        <input type="radio" name="gender" value="woman" style="margin-left:10px">タイプ2
    </label>
    <label>
    <input type="radio" name="gender" value="woman" style="margin-left:10px">タイプ3
</label>
    </div>
  

    Hello Vue!
    <div id="mapcontainer" style="width:600px;height:600px;"></div>
    </div>
    `,
    data: {
        map: "",
        reports: [],
        pin_test: [],
    },
    
    mounted: function () {
        console.log("created");
        this.$nextTick(function () {
            this.init_map();
        });
    },
    methods: {
        init_map : function () {
            this.map = L.map('mapcontainer');

            this.map.setView([35.655755 , 139.755465], 14);
            L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
                //attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>オープンストリートマップ</a>"
            }).addTo(this.map);
            this.init_pin_test();
        },
        init_pin_test : function(){
            var pin = [[35.8627, 139.6072], 
            [35.655755 , 139.755465],
            [34.655755 , 139.755465],]

            var count = 0;
            for(var item of pin){
                L.marker(item,{title:count,draggable:true}).addTo(this.map);
                console.log(item);
                count ++;
            }
            
        }
    },
})