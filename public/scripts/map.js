//import 'leaflet/dist/leaflet.css'; //<--------------add this line

const app = new Vue({
    el: '#app',
    template: `
    <div style="margin:10px">
    
    <div class="custom-control custom-radio">
      <input type="checkbox" class="custom-control-input" id="custom-radio-1">
      <label class="custom-control-label" for="custom-radio-1">選択肢1</label>
    </div>
    <div class="custom-control custom-radio">
      <input type="checkbox" class="custom-control-input" id="custom-radio-2">
      <label class="custom-control-label" for="custom-radio-2">選択肢2</label>
    </div>
    <div class="custom-control custom-radio">
      <input type="checkbox" class="custom-control-input" id="custom-radio-3">
      <label class="custom-control-label" for="custom-radio-3">選択肢3</label>
    </div>
  

    Hello Vue!
    <div id="mapcontainer" style="width:600px;height:600px;"></div>
    </div>
    `,
    data: {
        map: '',
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

            this.map.setView([35.40, 136], 5);
            L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
                attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
            }).addTo(this.map);
        },
    },
})