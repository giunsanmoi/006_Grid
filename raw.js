var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";
var timer = null;
var timerInterval = 50;
var opacityDecrease = .01;
var count = 0;
var starAddFreq = 2;
var opacityDecFreq = 1;

function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function randomPos(low, high) {
  return Math.floor(Math.random()* (high-low)) + low;
}

function addElement() {
  var starGroup = document.getElementById("starGroup");
  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", randomPos(0,100));
  useElem.setAttributeNS(null, "y", randomPos(0,100));
  useElem.setAttributeNS(null, "transform", "scale(.1)");

  useElem.setAttributeNS(null, "fill", randomColor());
  useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#star");

  starGroup.appendChild(useElem);
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

function addled(x,y) {
  var objectGroup = document.getElementById("objectGroup");

  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  useElem.setAttributeNS(null, "transform", "scale(1)");

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#led");

  objectGroup.appendChild(useElem);
}

function addbattery(x,y) {
  var objectGroup = document.getElementById("objectGroup");
  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  useElem.setAttributeNS(null, "transform", "scale(1)");

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#battery");

  objectGroup.appendChild(useElem);
}
function addResistor(x,y) {
  var objectGroup = document.getElementById("objectGroup");
  var useElem = document.createElementNS(xmlns, "use");

  useElem.setAttributeNS(null, "x", x);
  useElem.setAttributeNS(null, "y", y);
  useElem.setAttributeNS(null, "transform", "scale(1)");

  //useElem.setAttributeNS(null, "fill", randomColor());
  //useElem.setAttributeNS(null, "stroke", randomColor());
  useElem.setAttributeNS(null, "opacity", 1);

  useElem.setAttributeNS(xlinkns, "xlink:href", "#resistor");

  objectGroup.appendChild(useElem);
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
var target_move;
var is_addLine, x_line_start, y_line_start;
var x_point_visible, y_point_visible;
function press(e){
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
  if(((x_25<13)||(x_25>37))&&((y_25<13)||(y_25>37))){
    is_addLine = true;
    x_line_start = (x_50 + Math.floor(x_25/25))*50;
    y_line_start = (y_50 + Math.floor(y_25/25))*50;;
  }
  //var x_set = (x_50 + x_25)*50;
  //var y_set = (y_50 + y_25)*50;

  if((is_select > 1)&&(x_set >= 50)&&(x_set <= 1550)&&(y_set >= 50)&&(y_set <= 750)){
    //addPoint(x_set, y_set);


  }
}
function Drap_object(e){
  var x_mouse = e.x-7;
  var y_mouse = e.y-7;

  var x_object_visible = x_mouse%50;
  var y_object_visible = y_mouse%50;

  if(((x_object_visible > 37)||(x_object_visible < 13))&&((y_object_visible > 37)||(y_object_visible < 13))&&(!is_addLine)){
    var x_object_visible_grid = Math.floor(x_mouse/50) + Math.floor(x_object_visible/25);
    var y_object_visible_grid = Math.floor(y_mouse/50) + Math.floor(y_object_visible/25);
    if((x_object_visible_grid != x_point_visible)||(y_object_visible_grid != y_point_visible)){
      while(pointGroup.childElementCount > 0){
        pointGroup.firstChild.remove();
      }
      if((x_object_visible_grid > 0)&&(x_object_visible_grid < 32)&&(y_object_visible_grid > 0)&&(y_object_visible_grid<16)){
        addPoint(x_object_visible_grid*50, y_object_visible_grid*50);
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


  if(drapObject_status == 1){
    //console.log(e.x);
    var x_object = Number(target_move.getAttributeNS(null,'x'));
    var y_object = Number(target_move.getAttributeNS(null,'y'));

    if((x_object + 30) < (x_mouse)){
      x_object = x_object + 50;
      target_move.setAttributeNS(null,'x',x_object);
    }
    else{
      if((x_object - 30) > (x_mouse)){
        x_object = x_object - 50;
        target_move.setAttributeNS(null,'x',x_object);
      }
    }
    if((y_object + 30) < (y_mouse)){
      y_object = y_object + 50;
      target_move.setAttributeNS(null,'y',y_object);
    }
    else{
      if((y_object - 30) > (y_mouse)){
        y_object = y_object - 50;
        target_move.setAttributeNS(null,'y',y_object);
      }
    }
  }
  if(is_addLine){
    if(x_mouse > (x_line_start + 37)){
      addLine('line_horizontal',x_line_start,y_line_start);
      x_line_start+=50;
    }
    if(x_mouse < (x_line_start - 37)){
      x_line_start-=50;
      addLine('line_horizontal',x_line_start,y_line_start);
    }
    if(y_mouse > (y_line_start + 37)){
      addLine('line_vertical',x_line_start,y_line_start);
      y_line_start+=50;
    }
    if(y_mouse < (y_line_start - 37)){
      y_line_start-=50;
      addLine('line_vertical',x_line_start,y_line_start);
    }
  }
}
var drapObject_status = 0;
function startDrap_object(e){
  x_center = (e.x-7)%50;
  y_center = (e.y-7)%50;
  console.log(e.x - 7);
  console.log(e.y - 7);
  if(((x_center > 15)&&(x_center < 35))){
    drapObject_status = 1;
    target_move = e.target;
    console.log(target_move);
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
  if(((x_25<13)||(x_25>37))&&((y_25<13)||(y_25>37))){
    is_addLine = true;
    x_line_start = (x_50 + Math.floor(x_25/25))*50;
    y_line_start = (y_50 + Math.floor(y_25/25))*50;;
  }

  //console.log(target_move.getAttributeNS('xlink:href','status'));
  //var temp = document.getElementById('objectGroup');
  //console.log(temp['1']);
  //e.target.setAttributeNS(null,"style", 'fill:#ffff00');
}
function stopDrap_object(e){
  drapObject_status = 0;
  is_addLine = 0;

  //var translate = "translate(100, 0)";
  //e.target.setAttributeNS(null, "transform", translate);

}


$(document).ready(function() {
      //addElement();
  document.getElementById('window_design').addEventListener('mousedown',press,false);
  document.getElementById('window_design').addEventListener('mousemove',Drap_object,false);
  document.getElementById('window_design').addEventListener('mouseup',stopDrap_object,false);

  document.getElementById('objectGroup').addEventListener('mousedown',startDrap_object,false);
  //document.getElementById('objectGroup').addEventListener('mousemove',Drap_object,false);
  //document.getElementById('objectGroup').addEventListener('mouseup',stopDrap_object,false);
  addled(125,100);
  addled(125,200);
  addbattery(225,200);
  addResistor(325,200);
  //addLine('line_vertical',100,50);
})


/*window_control.onmousedown = function(e){
  console.log(e.x)
}*/
