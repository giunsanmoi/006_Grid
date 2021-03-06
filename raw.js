var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var timer = null;
var timerInterval = 50;
var opacityDecrease = .01;
var count = 0;
var starAddFreq = 2;
var opacityDecFreq = 1;

const grid_step = 50;
var x0;


var target_move;
var is_addLine, x_line_start, y_line_start;
var x_point_visible, y_point_visible;


var svg,
    pt,
    dot;


var is_drapObject = false;
var is_selecting, x_selected = false;
var is_selecting_touch = false;

var led_g=[], line_g = [], battery_g=[];
var led_g_status = false, line_prex = 0, line_prey = 0, battery_g_status = false;
var value_line = [];
var index_object = 0;
function resize_process(){
  var w = window.outerWidth;
  var h = window.outerHeight;
  var windows = document.getElementById("svg_window");
  windows.setAttributeNS(null, "height", h);
  windows.setAttributeNS(null, "width", w);
}

function addline_grid_vertical(x, height) {
  var gridGroup = document.getElementById("gridGroup");
  var useElem = document.createElementNS(xmlns, "line");

  useElem.setAttributeNS(null, "x1", x);
  useElem.setAttributeNS(null, "y1", 0);
  useElem.setAttributeNS(null, "x2", x);
  useElem.setAttributeNS(null, "y2", height);
  useElem.setAttributeNS(null, "class", "line");
  useElem.setAttributeNS(null, "opacity", 1);
  //useElem.style.stroke = 'rgb(0,60,245)';
  useElem.setAttributeNS(null,'stroke','#ddeede');
  useElem.setAttributeNS(null,'stroke-width','1');

  gridGroup.appendChild(useElem);
}
function addline_grid_horizontal(y, x_min, width) {
  var gridGroup = document.getElementById("gridGroup");
  var useElem = document.createElementNS(xmlns, "line");

  useElem.setAttributeNS(null, "x1", x_min);
  useElem.setAttributeNS(null, "y1", y);
  useElem.setAttributeNS(null, "x2", width);
  useElem.setAttributeNS(null, "y2", y);
  useElem.setAttributeNS(null, "class", "line");
  useElem.setAttributeNS(null, "opacity", 1);
  //useElem.style.stroke = 'rgb(0,60,245)';
  useElem.setAttributeNS(null,'stroke','#ddeede');
  useElem.setAttributeNS(null,'stroke-width','1');

  gridGroup.appendChild(useElem);
}
function grid_windowDesign_init(){
  var width = window.outerWidth;
  var height = window.outerHeight;
  var x_start = width/5;
  var x_stop = width;
  var y_start = 0;
  var y_stop = height;

  var x_draw = x_start;
  while(x_draw < x_stop){
    addline_grid_vertical(x_draw, height);
    x_draw = x_draw + grid_step;
  }
  var y_draw = y_start;
  console.log(y_draw);
  console.log(y_stop);
  while(y_draw < y_stop){
    addline_grid_horizontal(y_draw, x_start, width);
    y_draw = y_draw + grid_step;
  }
}

function windowElements_Init(){
  addled(x0/4,40,'elementsGroup',1);
  addbattery(x0*3/4,40,'elementsGroup',1);
  addResistor(x0/4,140,'elementsGroup',1);
  addCapacitor(x0*3/4,140,'elementsGroup',1);
  addInductor(x0/4,240,'elementsGroup',1);
  addPulseOut(x0*3/4,240,'elementsGroup',1);
  addButton(x0/4,340,'elementsGroup',1);
}

function addPoint(x,y) {
  var pointGroup = document.getElementById("pointGroup");
  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  useElem.setAttributeNS(null, "transform", "scale(1)");

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#point");

  pointGroup.appendChild(useElem);
}
function addled(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#led_off_element");

  group_.appendChild(useElem);
}
function addbattery(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#battery_element");

  group_.appendChild(useElem);
}
function addResistor(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#resistor_element");

  group_.appendChild(useElem);
}
function addCapacitor(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#capacitor_element");

  group_.appendChild(useElem);
}
function addInductor(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#inductor_element");

  group_.appendChild(useElem);
}
function addPulseOut(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#pulseOut_element");

  group_.appendChild(useElem);
}
function addButton(x,y, group, scale) {
  var group_ = document.getElementById(group);

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#button_element");

  group_.appendChild(useElem);
}
function addLine(line_type,x,y){
  var lineGroup = document.getElementById("lineGroup");
  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  useElem.setAttributeNS(null, "transform", "scale(1)");

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);
  if(line_type=='line_horizontal'){
    useElem.setAttributeNS(xlinkns, "xlink:href", "#line_horizontal");
  }
  else{
    useElem.setAttributeNS(xlinkns, "xlink:href", "#line_vertical");
  }


  lineGroup.appendChild(useElem);
}
function addObject(obj, x, y, scale){
  var group_ = document.getElementById('objectGroup');

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  scale_str = 'scale('+ scale + ')';
  useElem.setAttributeNS(null, "transform", scale_str);

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", obj);

  if(obj=='#led_off'){
    led_g_status = true;
  }
  if(obj=='#battery'){
    battery_g_status = true;
  }

  group_.appendChild(useElem);
  index_object = index_object + 1;
}

function addLine_G(case_){
  switch(case_)
  {
    case 1:
    {
      var group_item = 0;
      if(line_g.length > 0){
        x1 = x_line_start - 50;
        x2 = x_line_start;
        y = y_line_start;
        var is_choose = false, x_choose = 0;
        //Tim diem trung voi duong co san (group co san)
        for(var i = 0; i < line_g.length; i++){
          if(((line_g[i]['coor']['x'] == x1)||(line_g[i]['coor']['x'] == x2))&&(line_g[i]['coor']['y'] == y)){
            group_item = line_g[i]['group'];
            is_choose = true;
            if(line_g[i]['coor']['x'] == x1){
              x_choose = 1;
            }
            else{
              x_choose = 2;
            }
            break;
          }
        }
        if(is_choose){
          if(x_choose == 1){
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
            line_g.push(list_temp);
          }
          else{
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start - 50), y:(y_line_start)}};
            line_g.push(list_temp);
          }
        }
        else{//Truong hop diem ko thuoc cac group da tao
          for(var i = 0; i < line_g.length; i++){
            if(line_g[i]['group'] >= group_item){
              group_item = group_item + 1;
            }
          }
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start - 50), y:(y_line_start)}};
          line_g.push(list_temp);
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
          line_g.push(list_temp);
        }
      }
      else {
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start - 50), y:(y_line_start)}};
        line_g.push(list_temp);
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
        line_g.push(list_temp);
      }
      break;
    }
    case 2:
    {
      var group_item = 0;
      if(line_g.length > 0){
        x1 = x_line_start + 50;
        x2 = x_line_start;
        y = y_line_start;
        var is_choose = false, x_choose = 0;
        //Tim diem trung voi duong co san (group co san)
        for(var i = 0; i < line_g.length; i++){
          if(((line_g[i]['coor']['x'] == x1)||(line_g[i]['coor']['x'] == x2))&&(line_g[i]['coor']['y'] == y)){
            group_item = line_g[i]['group'];
            is_choose = true;
            if(line_g[i]['coor']['x'] == x1){
              x_choose = 1;
            }
            else{
              x_choose = 2;
            }
            break;
          }
        }
        if(is_choose){
          if(x_choose == 1){
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
            line_g.push(list_temp);
          }
          else{
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start + 50), y:(y_line_start)}};
            line_g.push(list_temp);
          }
        }
        else{//Truong hop diem ko thuoc cac group da tao
          for(var i = 0; i < line_g.length; i++){
            if(line_g[i]['group'] >= group_item){
              group_item = group_item + 1;
            }
          }
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start + 50), y:(y_line_start)}};
          line_g.push(list_temp);
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
          line_g.push(list_temp);
        }
      }
      else {
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start + 50), y:(y_line_start)}};
        line_g.push(list_temp);
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
        line_g.push(list_temp);
      }
      break;
    }
    case 3:
    {
      var group_item = 0;
      if(line_g.length > 0){
        y1 = y_line_start - 50;
        y2 = y_line_start;
        x = x_line_start;
        var is_choose = false, y_choose = 0;
        //Tim diem trung voi duong co san (group co san)
        for(var i = 0; i < line_g.length; i++){
          if(((line_g[i]['coor']['y'] == y1)||(line_g[i]['coor']['y'] == y2))&&(line_g[i]['coor']['x'] == x)){
            group_item = line_g[i]['group'];
            is_choose = true;
            if(line_g[i]['coor']['y'] == y1){
              y_choose = 1;
            }
            else{
              y_choose = 2;
            }
            break;
          }
        }
        if(is_choose){
          if(y_choose == 1){
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
            line_g.push(list_temp);
          }
          else{
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start - 50)}};
            line_g.push(list_temp);
          }
        }
        else{//Truong hop diem ko thuoc cac group da tao
          for(var i = 0; i < line_g.length; i++){
            if(line_g[i]['group'] >= group_item){
              group_item = group_item + 1;
            }
          }
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start - 50)}};
          line_g.push(list_temp);
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
          line_g.push(list_temp);
        }
      }
      else {
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start - 50)}};
        line_g.push(list_temp);
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
        line_g.push(list_temp);
      }
      break;
    }
    case 4:
    {
      var group_item = 0;
      if(line_g.length > 0){
        y1 = y_line_start + 50;
        y2 = y_line_start;
        x = x_line_start;
        var is_choose = false, y_choose = 0;
        //Tim diem trung voi duong co san (group co san)
        for(var i = 0; i < line_g.length; i++){
          if(((line_g[i]['coor']['y'] == y1)||(line_g[i]['coor']['y'] == y2))&&(line_g[i]['coor']['x'] == x)){
            group_item = line_g[i]['group'];
            is_choose = true;
            if(line_g[i]['coor']['y'] == y1){
              y_choose = 1;
            }
            else{
              y_choose = 2;
            }
            break;
          }
        }
        if(is_choose){
          if(y_choose == 1){
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
            line_g.push(list_temp);
          }
          else{
            var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start + 50)}};
            line_g.push(list_temp);
          }
        }
        else{//Truong hop diem ko thuoc cac group da tao
          for(var i = 0; i < line_g.length; i++){
            if(line_g[i]['group'] >= group_item){
              group_item = group_item + 1;
            }
          }
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start + 50)}};
          line_g.push(list_temp);
          var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
          line_g.push(list_temp);
        }
      }
      else {
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start + 50)}};
        line_g.push(list_temp);
        var list_temp = {group:group_item,value:-1,coor:{x:(x_line_start), y:(y_line_start)}};
        line_g.push(list_temp);
      }
      break;
    }
  }
}

function press(e){
  console.log(e.target);
  console.log(e.button);
  if(e.button == 2){
    for(var j = 0; j < battery_g.length; j++){
      for(var i = 0; i < line_g.length; i++){
        if((line_g[i]['coor']['x'] == (battery_g[j]['coor']['x'] - 25))&&(line_g[i]['coor']['y'] == battery_g[j]['coor']['y'])) {
          value_line[line_g[i]['group']] = 1;
        }
        else{
          if((line_g[i]['coor']['x'] == (battery_g[j]['coor']['x'] + 25))&&(line_g[i]['coor']['y'] == battery_g[j]['coor']['y'])){
            value_line[line_g[i]['group']] = 2;
          }
        }
      }
    }

    for(var i = 0; i < led_g.length; i++){
      var pin1_value = -1, pin2_value = -1;
      var coor1x = led_g[i]['coor']['x'] - 25;
      var coor2x = led_g[i]['coor']['x'] + 25;
      var coory = led_g[i]['coor']['y'];
      for(var j = 0; j < line_g.length; j++){
        if((coor1x == line_g[j]['coor']['x'])&&(coory == line_g[j]['coor']['y'])) {
          pin1_value = value_line[line_g[j]['group']];
        }
        if((coor2x == line_g[j]['coor']['x'])&&(coory == line_g[j]['coor']['y'])) {
          pin2_value = value_line[line_g[j]['group']];
        }
      }
      var obj = document.getElementById('objectGroup').children[led_g[i]['index'] - 1];
      if(((pin1_value == 1)&&(pin2_value == 2))||((pin1_value == 2)&&(pin2_value == 1))){
        obj.setAttributeNS(xlinkns,"xlink:href", "#led_on");
      }
    }
  }
  else {
    x_coor = e.x - x0;
    y_coor = e.y;
    var x_50 = Math.floor(x_coor/50);
    var x_25 = Math.floor((x_coor%50));
    var y_50 = Math.floor(y_coor/50);
    var y_25 = Math.floor((y_coor%50));
    var is_select = 0;
    if(x_25 < 13){
      var x_set = (x_50)*50;
      is_select = is_select + 1;
    }
    if(x_25 > 37){
      var x_set = (x_50 + 1)*50;
      is_select = is_select + 1;
    }
    if(y_25 < 13){
      var y_set = (y_50)*50;
      is_select = is_select + 1;
    }
    if(y_25 > 37){
      var y_set = (y_50 + 1)*50;
      is_select = is_select + 1;
    }
    if(e.x > x0){
      if(((x_25<13)||(x_25>37))&&((y_25<13)||(y_25>37))&&(!is_drapObject)){
        is_addLine = true;
        x_line_start = (x_50 + Math.floor(x_25/25))*50;
        y_line_start = (y_50 + Math.floor(y_25/25))*50;;
      }
    }
    //var x_set = (x_50 + x_25)*50;
    //var y_set = (y_50 + y_25)*50;

    if((is_select > 1)&&(x_set >= 50)&&(x_set <= 1550)&&(y_set >= 50)&&(y_set <= 750)){
      //addPoint(x_set, y_set);


    }
  }
}
function startDrap_object(e){
  x_center = (e.x-x0)%50;
  y_center = (e.y)%50;

  if(((x_center > 15)&&(x_center < 35))){
    is_drapObject = true;
    target_move = e.target;
    //console.log(target_move);
    document.body.style.cursor = 'grab';
  }

  x_coor = e.x - 7;
  y_coor = e.y - 7;
  var x_50 = Math.floor(x_coor/50);
  var x_25 = Math.floor((x_coor%50));
  var y_50 = Math.floor(y_coor/50);
  var y_25 = Math.floor((y_coor%50));
  var is_select = 0;
  if(x_25 < 13){
    var x_set = (x_50)*50;
    is_select = is_select + 1;
  }
  if(x_25 > 37){
    var x_set = (x_50 + 1)*50;
    is_select = is_select + 1;
  }
  if(y_25 < 13){
    var y_set = (y_50)*50;
    is_select = is_select + 1;
  }
  if(y_25 > 37){
    var y_set = (y_50 + 1)*50;
    is_select = is_select + 1;
  }

  //if(((x_25<13)||(x_25>37))&&((y_25<13)||(y_25>37))){
  //  is_addLine = true;
  //  x_line_start = (x_50 + Math.floor(x_25/25))*50;
  //  y_line_start = (y_50 + Math.floor(y_25/25))*50;;
  //}

  //console.log(target_move.getAttributeNS('xlink:href','status'));
  //var temp = document.getElementById('objectGroup');
  //console.log(temp['1']);
  //e.target.setAttributeNS(null,"style", 'fill:#ffff00');
}
function Drap_object(e){
  var x_mouse = e.x - x0;
  var y_mouse = e.y;

  var x_object_visible = x_mouse%50;
  var y_object_visible = y_mouse%50;
  if(((x_object_visible > 37)||(x_object_visible < 13))&&((y_object_visible > 37)||(y_object_visible < 13))&&(!is_addLine)&&(!is_selecting)){
    var x_object_visible_grid = Math.floor(x_mouse/50) + Math.floor(x_object_visible/25);
    var y_object_visible_grid = Math.floor(y_mouse/50) + Math.floor(y_object_visible/25);
    if((x_object_visible_grid != x_point_visible)||(y_object_visible_grid != y_point_visible)){
      while(pointGroup.childElementCount > 0){
        pointGroup.firstChild.remove();
      }
      if((x_object_visible_grid > 0)&&(x_object_visible_grid < 32)&&(y_object_visible_grid > 0)&&(y_object_visible_grid<16)){
        addPoint(x0 + x_object_visible_grid*50, y_object_visible_grid*50);
        x_point_visible = x_object_visible_grid;
        y_point_visible = y_object_visible_grid;
      }
      else{
        while(pointGroup.childElementCount > 0){
          pointGroup.firstChild.remove();
        }
        x_point_visible = 0;
        y_point_visible = 0;
      }

    }
  }
  else{
    while(pointGroup.childElementCount > 0){
      pointGroup.firstChild.remove();
    }
    x_point_visible = 0;
    y_point_visible = 0;
  }


  if(is_drapObject){
    var x_object = Number(target_move.getAttributeNS(null,'x')) - x0;
    var y_object = Number(target_move.getAttributeNS(null,'y'));
    var x_50 = Math.floor(x_mouse/50);
    var x_25 = Math.floor((x_mouse%50));
    var y_50 = Math.floor(y_mouse/50);
    var y_25 = Math.floor((y_mouse%50));

    x_selected = e.x;

    if((x_25 > 10)&&(x_25 < 40)){
      x_object = x_50*50 + 25;
      target_move.setAttributeNS(null,'x',x_object + x0);
    }

    if(y_25 < 15){
      y_object = y_50*50;
      target_move.setAttributeNS(null,'y',y_object);
    }
    else {
      if(y_25 > 35){
        y_object = y_50*50 + 50;
        target_move.setAttributeNS(null,'y',y_object);
      }
      else{
        y_object = y_50*50;
        target_move.setAttributeNS(null,'y',y_object);
      }
    }
  }
  if(is_addLine){
    if(e.x > x0){
      if(x_mouse > (x_line_start + 37)){
        addLine('line_horizontal',x_line_start + x0,y_line_start);
        x_line_start+=50;

        addLine_G(1);
      }
      if(x_mouse < (x_line_start - 37)){
        x_line_start-=50;
        addLine('line_horizontal',x_line_start  + x0,y_line_start);

        addLine_G(2);
      }
      if(y_mouse > (y_line_start + 37)){
        addLine('line_vertical',x_line_start  + x0,y_line_start);
        y_line_start+=50;

        addLine_G(3);
      }
      if(y_mouse < (y_line_start - 37)){
        y_line_start-=50;
        addLine('line_vertical',x_line_start  + x0,y_line_start);

        addLine_G(4);
      }
    }
    else{
      is_addLine = false;
    }
  }
  if(is_selecting){
    var obj = document.getElementById('objectGroup');
    target_move = obj;
    //console.log(obj.lastChild.getAttributeNS(null,'x'));

    if(e.x > (x0)){
      //console.log(e.x);
      var x_object = Number(obj.lastChild.getAttributeNS(null,'x')) - x0;
      var y_object = Number(obj.lastChild.getAttributeNS(null,'y'));
      var x_50 = Math.floor(x_mouse/50);
      var x_25 = Math.floor((x_mouse%50));
      var y_50 = Math.floor(y_mouse/50);
      var y_25 = Math.floor((y_mouse%50));

      x_selected = e.x;

      if((x_25 > 10)&&(x_25 < 40)){
        x_object = x_50*50 + 25;
        obj.lastChild.setAttributeNS(null,'x',x_object + x0);
      }

      if(y_25 < 15){
        y_object = y_50*50;
        obj.lastChild.setAttributeNS(null,'y',y_object);
      }
      else {
        if(y_25 > 35){
          y_object = y_50*50 + 50;
          obj.lastChild.setAttributeNS(null,'y',y_object);
        }
        else{
          y_object = y_50*50;
          obj.lastChild.setAttributeNS(null,'y',y_object);
        }
      }
    }
    else {
      obj.lastChild.setAttributeNS(null,'x',e.x);
      obj.lastChild.setAttributeNS(null,'y',e.y);
    }
  }
}
function stopDrap_object(e){
  is_drapObject = false;
  is_addLine = 0;
  if(is_selecting){
    is_selecting = false;

    var obj = document.getElementById('objectGroup');
    if(e.x < (x0 + 50)){
      obj.lastChild.remove();
    }
    if(led_g_status){
      //console.log(obj.lastChild.getAttributeNS(null, 'x') - x0)
      var list_temp = {index:index_object,coor:{x:(obj.lastChild.getAttributeNS(null, 'x') - x0), y:(obj.lastChild.getAttributeNS(null, 'y'))}};
      console.log(list_temp)
      led_g.push(list_temp)
      led_g_status = false;
    }
    if(battery_g_status){
      //console.log(obj.lastChild.getAttributeNS(null, 'x') - x0)
      var list_temp = {index:index_object,coor:{x:(obj.lastChild.getAttributeNS(null, 'x') - x0), y:(obj.lastChild.getAttributeNS(null, 'y'))}};
      console.log(list_temp)
      battery_g.push(list_temp)
      battery_g_status = false;
    }
  }
  document.body.style.cursor = 'crosshair';


  //var translate = "translate(100, 0)";
  //e.target.setAttributeNS(null, "transform", translate);

}

function select_elements(e){
  object_select = e.target.getAttributeNS(xlinkns,'href');
  console.log(object_select.indexOf('_element'));
  obj_str = object_select.substring(0,object_select.indexOf('_element'));
  console.log(obj_str);
  x = Math.floor(e.x/50)*50;
  y = Math.floor(e.y/50)*50;

  addObject(obj_str, e.x, e.y, 1);
  is_selecting = true;
  document.body.style.cursor = 'grab';
}

function select_elements_touch(e){
  console.log(e.touches[0].pageX + '-' + e.touches[0].pageY);
  object_select = e.target.getAttributeNS(xlinkns,'href');
  console.log(object_select.indexOf('_element'));
  obj_str = object_select.substring(0,object_select.indexOf('_element'));
  console.log(obj_str);
  x = Math.floor(e.touches[0].pageX/50)*50;
  y = Math.floor(e.touches[0].pageY/50)*50;

  addObject(obj_str, e.touches[0].pageX, e.touches[0].pageY, 1);
  is_selecting_touch = true;
}
function drap_elements_touch(e){
  var x_mouse = e.touches[0].pageX - x0;
  var y_mouse = e.touches[0].pageY;

  console.log(Math.floor(e.touches[0].pageX) + '-' + Math.floor(e.touches[0].pageY));
  if(is_selecting_touch){
    var obj = document.getElementById('objectGroup');
    target_move = obj;
    //console.log(obj.lastChild.getAttributeNS(null,'x'));

    if(e.touches[0].pageX > (x0)){
      //console.log(e.x);
      var x_object = Number(obj.lastChild.getAttributeNS(null,'x')) - x0;
      var y_object = Number(obj.lastChild.getAttributeNS(null,'y'));
      var x_50 = Math.floor(x_mouse/50);
      var x_25 = Math.floor((x_mouse%50));
      console.log(x_25);
      var y_50 = Math.floor(y_mouse/50);
      var y_25 = Math.floor((y_mouse%50));

      x_selected = e.touches[0].pageX;

      if((x_25 > 10)&&(x_25 < 40)){
        x_object = x_50*50 + 25;
        obj.lastChild.setAttributeNS(null,'x',x_object + x0);
        console.log('drap')
      }

      if(y_25 < 15){
        y_object = y_50*50;
        obj.lastChild.setAttributeNS(null,'y',y_object);
      }
      else {
        if(y_25 > 35){
          y_object = y_50*50 + 50;
          obj.lastChild.setAttributeNS(null,'y',y_object);
        }
        else{
          y_object = y_50*50;
          obj.lastChild.setAttributeNS(null,'y',y_object);
        }
      }
    }
    else {
      obj.lastChild.setAttributeNS(null,'x',e.touches[0].pageX);
      obj.lastChild.setAttributeNS(null,'y',e.touches[0].pageY);
    }
  }
}

$(document).ready(function() {
      //addElement();
  document.getElementById('svg_window').addEventListener('mousedown',press,false);
  document.getElementById('svg_window').addEventListener('mousemove',Drap_object,false);
  document.getElementById('svg_window').addEventListener('mouseup',stopDrap_object,false);

  document.getElementById('elementsGroup').addEventListener('mousedown',select_elements,false);
  document.getElementById('objectGroup').addEventListener('mousedown',startDrap_object,false);


  document.getElementById('elementsGroup').addEventListener('touchstart',select_elements_touch,false);
  document.getElementById('svg_window').addEventListener('touchmove',drap_elements_touch,false);

  document.addEventListener('contextmenu', event => event.preventDefault());

  svg  = document.getElementById('svg_window');
  pt   = svg.createSVGPoint();
  dot  = document.querySelector('#dot');

  var windows = document.getElementById("svg_window");
  var width = window.outerWidth;
  var height = window.outerHeight;
  console.log(width)
  var a = '0 0 ' + width + ' ' + height;
  windows.setAttributeNS(null, "viewBox", a);

  x0 = width/5;
  console.log(x0);

  var win_elements = document.getElementById("win_elements");
  win_elements.setAttributeNS(null, "width", width*20/100);
  win_elements.setAttributeNS(null, "height", height);
  var win_designwin_design = document.getElementById("win_designwin_design");
  win_design.setAttributeNS(null, "width", width*80/100);
  win_design.setAttributeNS(null, "height", height);
  win_design.setAttributeNS(null, "x", width*20/100);

  document.body.style.cursor = 'crosshair';

  grid_windowDesign_init();
  windowElements_Init();
  //addLine('line_vertical',100,50);
})
// window.resize event listener
window.addEventListener('resize', function() {
    // clear the timeout
    var windows = document.getElementById("svg_window");
    var width = window.outerWidth;
    var height = window.outerHeight;
    var a = '0 0 ' + width + ' ' + height;
    windows.setAttributeNS(null, "viewBox", a);
});


/*window_control.onmousedown = function(e){
  console.log(e.x)
}*/
