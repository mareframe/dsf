var Mareframe;
(function (Mareframe) {
    var DST;
    (function (DST) {
        var TKN_Widget = (function () {
            function TKN_Widget(canvasID, fileIO, gui) {
                var _this = this;
                this.m_backGroundColor = "#fff0f0";
                this.m_width = 200;
                this.m_height = 200;
                this.m_selectedPointIndex = null;
                this.m_selectedPoint = null;
                this.m_flipHorizontal = false;
                this.m_flipVertical = false;
                this.m_vertLines = [];
                this.handlePWLKeypress = function (e, data) {
                    if (e.which == 13) {
                        var newText = $(e.currentTarget).val();
                        e.currentTarget;
                        var newTextFloat = parseFloat(newText);
                        if (e.currentTarget.id == 'posY') {
                            if (newTextFloat < 0)
                                newTextFloat = 0;
                            if (newTextFloat > 1)
                                newTextFloat = 1;
                        }
                        else {
                            if (newTextFloat < _this.m_currentElement.getDataMin())
                                newTextFloat = _this.m_currentElement.getDataMin();
                            if (newTextFloat > _this.m_currentElement.getDataMax())
                                newTextFloat = _this.m_currentElement.getDataMax();
                        }
                        $(e.currentTarget).val(newTextFloat.toString());
                        var tmp13 = _this.tthis;
                        _this.m_pwl.removePointAtIndex(_this.m_selectedPointIndex);
                        var xVal;
                        var yVal;
                        if (_this.m_flipHorizontal) {
                            if (_this.m_flipVertical) {
                                xVal = _this.m_currentElement.getDataMax() - parseFloat($("#posX").val());
                                yVal = 1 - parseFloat($("#posY").val());
                            }
                            else {
                                xVal = parseFloat($("#posX").val());
                                yVal = 1 - parseFloat($("#posY").val());
                            }
                        }
                        else {
                            if (_this.m_flipVertical) {
                                xVal = _this.m_currentElement.getDataMax() - parseFloat($("#posX").val());
                                yVal = parseFloat($("#posY").val());
                            }
                            else {
                                xVal = parseFloat($("#posX").val());
                                yVal = parseFloat($("#posY").val());
                            }
                        }
                        if (_this.m_pwl.addPoint(xVal, yVal)) {
                            _this.m_selectedPointIndex = _this.m_pwl.sortPointsByX(_this.m_pwl.m_middlepoints.length - 1).valueOf();
                        }
                        else {
                            var tmp15 = $("#posX").val();
                            var tmp16 = _this.m_currentElement.getDataMin();
                            if ($("#posX").val() == _this.m_currentElement.getDataMin())
                                _this.m_selectedPointIndex = 0;
                            if ($("#posX").val() == _this.m_currentElement.getDataMax())
                                _this.m_selectedPointIndex = _this.m_pwl.getPoints().length - 1;
                            _this.m_pwl.sortPointsByX();
                            var tmp12 = _this.m_selectedPointIndex;
                        }
                        //if (this.m_selectedPoint.x < $("#posX").val()) 
                        //var tmp11 = this.m_pwl.sortPointsByX(this.m_pwl.m_middlepoints.length - 1);
                        //this.m_selectedPointIndex = this.m_pwl.sortPointsByX(this.m_pwl.m_middlepoints.length - 1).valueOf() as number;
                        _this.addPWLToStage();
                        _this.update();
                        _this.checkSelectedEndPoints();
                    }
                };
                this.handleMouseDown = function (e, data) {
                    //handleMouseDown(e: createjs.MouseEvent) {
                    //alert("mouseDown");
                    ////console.log("mousedown on " + e.target.id);
                    //var tt = e.target;
                    //e.data;
                    if (_this.m_selectedPointIndex !== null) {
                        var s1 = _this.getStageX(_this.m_selectedPointIndex);
                        var s2 = _this.getStageY(_this.m_selectedPointIndex);
                    }
                    //if (data !== undefined) {
                    if (data !== undefined) {
                        $("#selectedPointInfo").show();
                        var tmp6 = _this.m_selectedPointIndex;
                        var tmp7 = data.clickedPointIndex;
                        _this.m_selectedPoint = e.target;
                        var tmp = data;
                        var tmp2 = data.clickedPointIndex;
                        var tmp3 = _this.m_pwl.getPoints();
                        var tmp4 = data.clickedPointIndex.valueOf();
                        _this.m_selectedPointIndex = data.clickedPointIndex.valueOf();
                        _this.updateInput();
                        _this.m_selectedPoint = data.select;
                        _this.checkSelectedEndPoints();
                        var s3 = _this.getStageX(_this.m_selectedPointIndex);
                        var s4 = _this.getStageY(_this.m_selectedPointIndex);
                    }
                    else {
                        $("#selectedPointInfo").hide();
                        _this.m_selectedPointIndex = null;
                    }
                    _this.addPWLToStage();
                    var t = _this.m_selectedPointIndex;
                    var t2 = _this.m_pwl;
                    ////console.log("selectedIndex: " + this.m_selectedPointIndex); 
                    _this.update();
                };
                this.handleDoubleClick = function (e) {
                    var tmpx = _this.m_pwl.getPoints()[0].x * _this.m_unitX;
                    if (_this.m_flipHorizontal) {
                        var tmpux = _this.m_unitX;
                        var tmpuy = _this.m_unitY;
                        var tmph = _this.m_height;
                        var tmpw = _this.m_width;
                        if (_this.m_flipVertical) {
                            _this.m_pwl.addPoint((_this.m_offset_x + (_this.m_width - e.stageX) + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX, (-_this.m_offset_y + e.stageY) / _this.m_unitY);
                            var tmp_x_h_v = (_this.m_offset_x + (_this.m_width - e.stageX) + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX;
                            var tmp_y_h_v = (-_this.m_offset_y + e.stageY) / _this.m_unitY;
                            var tt = 0;
                        }
                        else {
                            _this.m_pwl.addPoint((-_this.m_offset_x + e.stageX + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX, (-_this.m_offset_y + e.stageY) / _this.m_unitY);
                            var tmp_x_h = (-_this.m_offset_x + e.stageX + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX;
                            var tmp_y_h = (-_this.m_offset_y + e.stageY) / _this.m_unitY;
                            var tt = 0;
                        }
                    }
                    else {
                        if (_this.m_flipVertical) {
                            _this.m_pwl.addPoint((_this.m_offset_x + (_this.m_width - e.stageX) + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX, (_this.m_offset_y + _this.m_pwl.m_maxValue * _this.m_unitY - e.stageY) / _this.m_unitY);
                            var tmp_x_v = (_this.m_offset_x + (_this.m_width - e.stageX) + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX;
                            var tmp_y_v = (_this.m_offset_y + _this.m_pwl.m_maxValue * _this.m_unitY - e.stageY) / _this.m_unitY;
                        }
                        else {
                            _this.m_pwl.addPoint((-_this.m_offset_x + e.stageX + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX, (_this.m_offset_y + _this.m_pwl.m_maxValue * _this.m_unitY - e.stageY) / _this.m_unitY);
                            var tmp_x = (-_this.m_offset_x + e.stageX + _this.m_pwl.getPoints()[0].x * _this.m_unitX) / _this.m_unitX;
                            var tmp_y = (_this.m_offset_y + _this.m_pwl.m_maxValue * _this.m_unitY - e.stageY) / _this.m_unitY;
                        }
                    }
                    var ttt = _this.m_pwl;
                    _this.m_selectedPointIndex = null;
                    $("#selectedPointInfo").hide();
                    _this.m_pwl.sortPointsByX();
                    var ttt = _this.m_pwl;
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleDeleteButton = function (e) {
                    //console.log("houh");
                    _this.m_pwl.removePointAtIndex(_this.m_selectedPointIndex);
                    _this.m_selectedPointIndex = null;
                    $("#selectedPointInfo").hide();
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleFlipHorizontal = function (e) {
                    var t = _this;
                    if (_this.m_flipHorizontal) {
                        _this.m_flipHorizontal = false;
                        _this.m_currentElement.setFlipHorizontal(false);
                    }
                    else {
                        _this.m_flipHorizontal = true;
                        _this.m_currentElement.setFlipHorizontal(true);
                    }
                    _this.updateInput();
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleFlipVertical = function (e) {
                    if (_this.m_flipVertical) {
                        _this.m_flipVertical = false;
                        _this.m_currentElement.setFlipVertical(false);
                    }
                    else {
                        _this.m_flipVertical = true;
                        _this.m_currentElement.setFlipVertical(true);
                    }
                    _this.updateInput();
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleLinearize = function (e) {
                    var a = (_this.m_pwl.getPoints()[_this.m_pwl.getPoints().length - 1].y - _this.m_pwl.getPoints()[0].y) / (_this.m_pwl.getPoints()[_this.m_pwl.getPoints().length - 1].x - _this.m_pwl.getPoints()[0].x);
                    var b = _this.m_pwl.getPoints()[0].y - a * _this.m_pwl.getPoints()[0].y;
                    for (var i = 1; i < _this.m_pwl.getPoints().length - 1; i++) {
                        _this.m_pwl.getPoints()[i].y = a * _this.m_pwl.getPoints()[i].x + b;
                    }
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleLoadFromFile = function (e) {
                    //console.log("not done yet, no not yet");
                    _this.m_fileIO.loadPWLFromFile(_this.m_pwl, _this.addPWLToStage);
                    _this.update();
                };
                this.handleSaveToFile = function (e) {
                    //console.log("not done yet");
                    var fileIO = _this.m_fileIO;
                    var widget = _this;
                    fileIO.savePiecewiseLinearFunction(widget.m_pwl);
                    $("#saveFile_div").show();
                    $("#saveFile_div").show().dblclick(function () {
                        ////console.log("DC filname");
                        var $filename = $("#filename");
                        var oldText = $filename.html();
                        $filename.html("<input type='text' value= '" + oldText + "'>");
                        $filename.children().first().focus();
                        $filename.children().first().keypress(function (e) {
                            if (e.which == 13) {
                                var newText = $(this).val();
                                //console.log("new text: " + newText);
                                if (newText.length < 1) {
                                    $filename.html(oldText);
                                    newText = oldText;
                                }
                                $filename.text(newText);
                                oldText = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                var saveName = oldText + ".tkn";
                                //console.log("saveName: " + saveName);
                                fileIO.savePiecewiseLinearFunction(widget.m_pwl);
                            }
                        });
                    });
                };
                this.handleDeleteAllPoints = function (e) {
                    //console.log("not done yet");
                    _this.m_pwl.getPoints().splice(1, _this.m_pwl.getPoints().length - 2);
                    _this.addPWLToStage();
                    _this.update();
                };
                this.handleShowAlternatives = function (e) {
                    //console.log("not done yet");
                    var tnp2 = _this.m_unitX;
                    var vertLines = [];
                    var i = 0;
                    if ($("#showAlternatives").text() == "Show Alternatives") {
                        for (var _i = 0, _a = _this.m_currentElement.getDataArr(); _i < _a.length; _i++) {
                            var data = _a[_i];
                            var linePieceWise = new createjs.Graphics().beginStroke(_this.m_guiHandler.m_googleColors[i++]).moveTo(data * _this.m_unitX, 0).lineTo(data * _this.m_unitX, 200);
                            _this.m_vertLines[i] = new createjs.Shape(linePieceWise);
                            _this.m_stage.addChild(_this.m_vertLines[i]);
                            $("#showAlternatives").text("Remove Alternatives");
                        }
                    }
                    else {
                        for (var _b = 0, _c = _this.m_vertLines; _b < _c.length; _b++) {
                            var vert = _c[_b];
                            _this.m_stage.removeChild(vert);
                        }
                        $("#showAlternatives").text("Show Alternatives");
                    }
                    //this.update();
                    _this.m_stage.update();
                };
                this.addPWLToStage = function () {
                    _this.m_stage.removeAllChildren();
                    _this.setSize(_this.m_width, _this.m_height);
                    var points = _this.m_pwl.getPoints();
                    var linePieceWise = new createjs.Graphics().beginStroke("#0000ff");
                    //linePieceWise.moveTo(this.m_offset_x, this.m_offset_y + (this.m_pwl.m_maxValue - points[0].y) * this.m_unitY);
                    for (var i = 0; i < points.length; i++) {
                        //linePieceWise.lineTo((points[i].x - points[0].x) * this.m_unitX, (this.m_pwl.m_maxValue - points[i].y) * this.m_unitY);
                        linePieceWise.lineTo(_this.getStageX(i), _this.getStageY(i));
                        //var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle((points[i].x - points[0].x) * this.m_unitX, (this.m_pwl.m_maxValue - points[i].y) * this.m_unitY, 8));
                        //var tmpsx = this.getStageX(i);
                        //var tmpsy = this.getStageY(i);
                        if (i !== _this.m_selectedPointIndex) {
                            var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle(_this.getStageX(i), _this.getStageY(i), 8));
                        }
                        else {
                            var point = new createjs.Shape(new createjs.Graphics().beginFill("red").drawCircle(_this.getStageX(i), _this.getStageY(i), 6));
                        }
                        //if (this.m_flipVertical) {
                        //    if (this.m_flipHorizontal) {
                        //        if (i !== this.m_selectedPointIndex) {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle(this.m_offset_x + this.getStageX(this.m_pwl.getPoints().length - 1 - i), this.m_offset_y + this.getStageY(this.m_pwl.getPoints().length - 1 - i), 8));
                        //        }
                        //        else {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("red").drawCircle(this.m_offset_x + this.getStageX(this.m_pwl.getPoints().length - 1 - i), this.m_offset_y + this.getStageY(this.m_pwl.getPoints().length - 1 - i), 6));
                        //        }
                        //    } else {
                        //        if (i !== this.m_selectedPointIndex) {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle(this.m_offset_x + this.getStageX(this.m_pwl.getPoints().length - 1 - i), this.m_offset_y + this.getStageY(i), 8));
                        //        }
                        //        else {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("red").drawCircle(this.m_offset_x + this.getStageX(this.m_pwl.getPoints().length - 1 - i), this.m_offset_y + this.getStageY(i), 6));
                        //        }
                        //    }
                        //}
                        //else {
                        //    if (this.m_flipHorizontal) {
                        //        if (i !== this.m_selectedPointIndex) {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle(this.m_offset_x + this.getStageX(i), this.m_offset_y + this.getStageY(this.m_pwl.getPoints().length - 1 - i), 8));
                        //        }
                        //        else {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("red").drawCircle(this.m_offset_x + this.getStageX(i), this.m_offset_y + this.getStageY(this.m_pwl.getPoints().length - 1 - i), 6));
                        //        }
                        //    } else {
                        //        if (i !== this.m_selectedPointIndex) {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("green").drawCircle(this.m_offset_x + this.getStageX(i), this.m_offset_y + this.getStageY(i), 8));
                        //        }
                        //        else {
                        //            var point = new createjs.Shape(new createjs.Graphics().beginFill("red").drawCircle(this.m_offset_x + this.getStageX(i), this.m_offset_y + this.getStageY(i), 6));
                        //        }
                        //    }
                        //}
                        point.on("click", _this.handleMouseDown, null, false, { clickedPointIndex: i, selectIndex: _this.m_selectedPointIndex, select: _this.m_selectedPoint }); //***************************************
                        //point.addEventListener("mousedown", this.hd);
                        //point.addEventListener("mousedown", this.m_eventHandleAndData);
                        //point.on("mousedown", (e: createjs.MouseEvent) => this.handleMouseDown(e), this, false, { PosX: points[i].x, posY: points[i].y });
                        //point.on("click", this.hd; 
                        _this.m_stage.addChild(point);
                    }
                    _this.m_stage.addChild(new createjs.Shape(linePieceWise));
                    _this.m_stage.update();
                };
                //creating stage and background
                this.m_stage = new createjs.Stage(canvasID);
                this.m_fileIO = fileIO;
                this.m_guiHandler = gui;
                //this.m_backGroundGraphics = new createjs.Graphics().beginFill(this.m_backGroundColor).drawRect(0, 0, this.m_width, this.m_height);
                //this.m_backGround = new createjs.Shape(this.m_backGroundGraphics);
                //this.m_stage.addChild(this.m_backGround);
                //this.m_stage.update();
                this.setSize(this.m_width, this.m_height);
                //this.addPWLToStage = this.addPWLToStage.bind(this);
                $("#selectedPointInfo").hide();
                $("#deleteButton").button().click(this.handleDeleteButton);
                $("#flipHorizontal").button().click(this.handleFlipHorizontal);
                $("#flipVertical").button().click(this.handleFlipVertical);
                $("#linearize").button().click(this.handleLinearize);
                $("#loadFromFileDiv").button().change(this.handleLoadFromFile);
                $("#saveToFile").button().click(this.handleSaveToFile);
                $("#deleteAllPoints").button().click(this.handleDeleteAllPoints);
                $("#showAlternatives").button().click(this.handleShowAlternatives);
                $("#saveFile_div").hide();
                $("#posX").keypress(this.handlePWLKeypress);
                $("#posY").keypress(this.handlePWLKeypress);
                $("#posX").blur(this.handlePWLKeypress);
                $("#posY").blur(this.handlePWLKeypress);
                //$(".not_done").prop("disable", true);
                //$(".not_done").button("disable");
                $(".not_done").hide();
                this.tthis = this;
            }
            ;
            //setters and getters
            TKN_Widget.prototype.setUnit = function (p_unit) {
                this.m_unit = p_unit;
            };
            TKN_Widget.prototype.setCurrentElement = function (p_elment) {
                this.m_currentElement = p_elment;
            };
            TKN_Widget.prototype.getCurrentElement = function () {
                return this.m_currentElement;
            };
            TKN_Widget.prototype.getBackGroundColor = function () {
                return this.m_backGroundColor;
            };
            TKN_Widget.prototype.setBackGroundColor = function (newColor) {
                this.m_backGroundColor = newColor;
            };
            TKN_Widget.prototype.getHeight = function () {
                return this.m_height;
            };
            TKN_Widget.prototype.getWidth = function () {
                return this.m_width;
            };
            TKN_Widget.prototype.setSize = function (p_width, p_height) {
                this.m_width = p_width;
                this.m_height = p_height;
                this.m_offset_x = (250 - p_width) * 0.5;
                this.m_offset_y = (250 - p_height) * 0.5;
                //this.m_backGroundGraphics.height = p_height
                //this.m_stage.removeChild(this.m_backGround);
                this.m_backGroundGraphics = new createjs.Graphics().beginFill(this.m_backGroundColor).drawRect(this.m_offset_x, this.m_offset_y, p_width, p_height);
                this.m_backGround = new createjs.Shape(this.m_backGroundGraphics);
                this.m_stage.addChild(this.m_backGround);
                var coorSys = new createjs.Graphics().beginStroke("#000033").setStrokeStyle(0.5);
                if (this.m_pwl !== undefined) {
                    this.m_unitX = this.m_width / (this.m_pwl.m_endPoint.x - this.m_pwl.m_startPoint.x);
                    this.m_unitY = this.m_height / (this.m_pwl.m_maxValue - this.m_pwl.m_minValue);
                    var x_min_text = new createjs.Text(this.m_pwl.getStartPoint().x.toString());
                    x_min_text.x = this.m_offset_x - x_min_text.getMeasuredWidth() * 0.5;
                    x_min_text.y = this.m_offset_y + this.m_height + 16;
                    coorSys.moveTo(this.m_offset_x, this.m_offset_y + this.m_height + 5);
                    coorSys.lineTo(this.m_offset_x, this.m_offset_y + this.m_height + 11);
                    var x_max_text = new createjs.Text(this.m_pwl.getEndPoint().x.toString());
                    x_max_text.x = this.m_offset_x - x_max_text.getMeasuredWidth() * 0.5 + this.m_width;
                    //x_max_text.x = this.m_offset_x + this.m_width;
                    x_max_text.y = this.m_offset_y + this.m_height + 16;
                    coorSys.moveTo(this.m_offset_x + this.m_width, this.m_offset_y + this.m_height + 5);
                    coorSys.lineTo(this.m_offset_x + this.m_width, this.m_offset_y + this.m_height + 11);
                    var unit_text = new createjs.Text(this.m_unit);
                    unit_text.x = 125 - unit_text.getMeasuredWidth();
                    unit_text.y = this.m_offset_y + this.m_height + 20;
                    this.m_stage.addChild(unit_text);
                    this.m_stage.addChild(x_min_text);
                    this.m_stage.addChild(x_max_text);
                }
                //EventListeners for the background
                this.m_backGround.addEventListener("mousedown", this.handleMouseDown); //******************************************
                //this.m_backGround.addEventListener("pressmove", this.handlePressMove);
                this.m_backGround.addEventListener("dblclick", this.handleDoubleClick);
                var y_max_text = new createjs.Text("1");
                y_max_text.x = 5;
                y_max_text.y = this.m_offset_y - y_max_text.getMeasuredHeight() * 0.5;
                coorSys.moveTo(14, this.m_offset_y);
                coorSys.lineTo(20, this.m_offset_y);
                var y_min_text = new createjs.Text("0");
                y_min_text.x = 5;
                y_min_text.y = this.m_offset_y + p_height - y_max_text.getMeasuredHeight() * 0.5;
                coorSys.moveTo(14, this.m_offset_y + p_height);
                coorSys.lineTo(20, this.m_offset_y + p_height);
                coorSys.setStrokeStyle(1);
                coorSys.moveTo(this.m_offset_x, this.m_offset_y + p_height);
                coorSys.lineTo(this.m_offset_x, this.m_offset_y - 15);
                coorSys.moveTo(this.m_offset_x, this.m_offset_y + p_height);
                coorSys.lineTo(this.m_offset_x + p_width + 15, this.m_offset_y + p_height);
                coorSys.moveTo(this.m_offset_x - 5, this.m_offset_y - 10);
                coorSys.lineTo(this.m_offset_x, this.m_offset_y - 15);
                coorSys.lineTo(this.m_offset_x + 5, this.m_offset_y - 10);
                coorSys.moveTo(this.m_offset_x + p_width + 10, this.m_offset_y + p_height - 5);
                coorSys.lineTo(this.m_offset_x + p_width + 15, this.m_offset_y + p_height);
                coorSys.lineTo(this.m_offset_x + p_width + 10, this.m_offset_y + p_height + 5);
                this.m_stage.addChild(y_max_text);
                this.m_stage.addChild(y_min_text);
                this.m_stage.addChild(new createjs.Shape(coorSys));
            };
            TKN_Widget.prototype.getValueFunction = function () {
                return this.m_valueFunction;
            };
            TKN_Widget.prototype.setValueFunction = function (newValueFunction) {
                this.m_valueFunction = newValueFunction;
            };
            TKN_Widget.prototype.getPwl = function () {
                return this.m_pwl;
            };
            TKN_Widget.prototype.setPwl = function (newValueFunction) {
                this.m_pwl = newValueFunction;
                this.m_unitX = this.m_width / (this.m_pwl.m_endPoint.x - this.m_pwl.m_startPoint.x);
                this.m_unitY = this.m_height / (this.m_pwl.m_maxValue - this.m_pwl.m_minValue);
            };
            TKN_Widget.prototype.getFlipVertical = function () {
                return this.m_flipVertical;
            };
            TKN_Widget.prototype.setFlipVertical = function (p_fVert) {
                this.m_flipVertical = p_fVert;
            };
            TKN_Widget.prototype.getFlipHorizontal = function () {
                return this.m_flipHorizontal;
            };
            TKN_Widget.prototype.setFlipHorizontal = function (p_fHori) {
                this.m_flipHorizontal = p_fHori;
            };
            //Event handlers
            TKN_Widget.prototype.handlePressMove = function () {
                alert("PressMove");
            };
            TKN_Widget.prototype.hd = function (e, data) { };
            TKN_Widget.prototype.update = function () {
                this.m_stage.update();
                this.m_guiHandler.updateDataTableDiv(this.m_currentElement);
                if (this.m_guiHandler.isReadyForSA()) {
                    this.m_guiHandler.updateFinalScores(this.m_guiHandler.m_finalScoreChosenObjective, this.m_guiHandler.getCritSelected());
                    var tm1 = this.m_currentElement;
                    this.m_guiHandler.updateChartData(this.m_guiHandler.m_SAChosenElement);
                    this.m_guiHandler.updateSATableData();
                    this.m_guiHandler.updateSA();
                }
            };
            TKN_Widget.prototype.addValueFunctionToStage = function () {
                //for (var i = 1; i < this.m_valueFunction.
                alert("not imp yet");
            };
            TKN_Widget.prototype.getStageX = function (p_index) {
                var ret = 0;
                if (this.m_flipVertical) {
                    //ret = (this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1].x - (this.m_pwl.getPoints()[p_index].x - this.m_pwl.getPoints()[0].x)) * this.m_unitX
                    //var t = this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1 - p_index].x;
                    //var t2 = this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1].x
                    ret = (-this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1 - p_index].x + this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1].x) * this.m_unitX;
                }
                else {
                    ret = (this.m_pwl.getPoints()[p_index].x - this.m_pwl.getPoints()[0].x) * this.m_unitX;
                }
                return ret + this.m_offset_x;
            };
            TKN_Widget.prototype.getStageY = function (p_index) {
                var ret = 0;
                if (this.m_flipHorizontal) {
                    if (this.m_flipVertical) {
                        //var t = this.m_pwl.getPoints().length - 1 - p_index
                        ret = this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1 - p_index].y * this.m_unitY;
                    }
                    else {
                        ret = this.m_pwl.getPoints()[p_index].y * this.m_unitY;
                        var tt = 0;
                    }
                }
                else {
                    if (this.m_flipVertical) {
                        ret = (this.m_pwl.m_maxValue - this.m_pwl.getPoints()[this.m_pwl.getPoints().length - 1 - p_index].y) * this.m_unitY;
                    }
                    else {
                        ret = (this.m_pwl.m_maxValue - this.m_pwl.getPoints()[p_index].y) * this.m_unitY;
                    }
                }
                var t = this.m_pwl.getPoints()[p_index].y;
                return ret + this.m_offset_y;
            };
            TKN_Widget.prototype.checkSelectedEndPoints = function () {
                var tmp3 = this.m_pwl.getPoints().length;
                if (this.m_selectedPointIndex === 0 || this.m_selectedPointIndex === this.m_pwl.getPoints().length - 1) {
                    $("#posX").prop("disabled", true);
                    $("#deleteButton").hide();
                }
                else {
                    $("#posX").prop("disabled", false);
                }
            };
            TKN_Widget.prototype.updateInput = function () {
                if (this.m_selectedPointIndex != null) {
                    if (this.m_flipHorizontal) {
                        $("#posY").val((Math.round(1000 * (1 - this.m_pwl.getPoints()[this.m_selectedPointIndex].y)) / 1000).toString());
                    }
                    else {
                        $("#posY").val((Math.round(1000 * this.m_pwl.getPoints()[this.m_selectedPointIndex].y) / 1000).toString());
                    }
                    if (this.m_flipVertical) {
                        $("#posX").val((Math.round(1000 * (this.m_currentElement.getDataMax() - this.m_pwl.getPoints()[this.m_selectedPointIndex].x)) / 1000).toString());
                    }
                    else {
                        $("#posX").val((Math.round(1000 * this.m_pwl.getPoints()[this.m_selectedPointIndex].x) / 1000).toString());
                    }
                }
            };
            return TKN_Widget;
        }());
        DST.TKN_Widget = TKN_Widget;
    })(DST = Mareframe.DST || (Mareframe.DST = {}));
})(Mareframe || (Mareframe = {}));
//# sourceMappingURL=TKN_Widget.js.map