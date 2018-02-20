var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mareframe;
(function (Mareframe) {
    var DST;
    (function (DST) {
        var ValueFunction = (function () {
            function ValueFunction() {
            }
            return ValueFunction;
        }());
        DST.ValueFunction = ValueFunction;
        var PiecewiseLinear = (function (_super) {
            __extends(PiecewiseLinear, _super);
            function PiecewiseLinear(p_startX, p_startY, p_endX, p_endY, p_minValue, p_maxValue) {
                var _this = _super.call(this) || this;
                //member variables
                _this.m_maxValue = 100;
                _this.m_minValue = 100;
                _this.m_middlepoints = [];
                _this.m_startPoint = new createjs.Point(0, 0);
                _this.m_endPoint = new createjs.Point(0, 0);
                _this.setEndPoint = function (p_x, p_y) {
                    this.m_endPoint.setValues(p_x, p_y);
                };
                _this.setStartPoint(p_startX, p_startY);
                _this.setEndPoint(p_endX, p_endY);
                _this.addPoint(p_startX, p_startY);
                _this.addPoint(p_endX, p_endY);
                if (p_minValue !== undefined) {
                    _this.m_minValue = p_minValue;
                }
                if (p_maxValue !== undefined) {
                    _this.m_maxValue = p_maxValue;
                }
                return _this;
            }
            //from ValueFunction
            PiecewiseLinear.prototype.getValue = function (p_x) {
                var ret = 0;
                var i = 0;
                var firstIndex = 0;
                var secondIndex = 0;
                // checks whether p_x is between startPoint and endPoint
                if (p_x >= this.m_startPoint.x && p_x <= this.m_endPoint.x) {
                    // finds what interval p_x is in
                    while (i < this.m_middlepoints.length - 1) {
                        ////var tmp1 = this.m_middlepoints[i + 1].x;
                        ////var tmp2 = this.m_middlepoints[i].x;
                        ////var tmp3 = p_x <= this.m_middlepoints[i + 1].x;
                        ////var tmp4 = p_x >= this.m_middlepoints[i].x;
                        ////var tmp5 = this.m_middlepoints[i + 1].x;
                        ////var tmp6 = this.m_middlepoints[i].x;
                        if (p_x <= this.m_middlepoints[i + 1].x && p_x >= this.m_middlepoints[i].x) {
                            firstIndex = i;
                            secondIndex = i + 1;
                        }
                        i++;
                    }
                    this.m_middlepoints[firstIndex]; // x1, y1
                    this.m_middlepoints[secondIndex]; // x2,y2                    
                    //var a = (y2-y1)//x2-x1)
                    // ret = a*p_x+y1-a*x1
                    ret = (this.m_middlepoints[secondIndex].y - this.m_middlepoints[firstIndex].y) / (this.m_middlepoints[secondIndex].x - this.m_middlepoints[firstIndex].x) * p_x + this.m_middlepoints[firstIndex].y - (this.m_middlepoints[secondIndex].y - this.m_middlepoints[firstIndex].y) / (this.m_middlepoints[secondIndex].x - this.m_middlepoints[firstIndex].x) * this.m_middlepoints[firstIndex].x;
                }
                else {
                    ret = null;
                }
                return ret;
            };
            //from ValueFunction
            PiecewiseLinear.prototype.flipVertical = function () {
                alert("Not Implemenrted");
            };
            //from ValueFunction
            PiecewiseLinear.prototype.flipHorizontally = function () {
                alert("Not Implemenrted");
            };
            //from ValueFunction
            PiecewiseLinear.prototype.linearize = function () {
                alert("Not Implemenrted");
            };
            //methods
            PiecewiseLinear.prototype.setStartPoint = function (p_x, p_y) {
                var hello = 100;
                this.m_startPoint.setValues(10, 20);
                this.m_startPoint.setValues(p_x, p_y);
            };
            PiecewiseLinear.prototype.getStartPoint = function () {
                return this.m_startPoint;
            };
            ;
            PiecewiseLinear.prototype.getEndPoint = function () {
                return this.m_endPoint;
            };
            ;
            //returns true if a point is added and false if a point is replaced
            PiecewiseLinear.prototype.addPoint = function (p_x, p_y) {
                var ret = true;
                ;
                if (this.m_middlepoints.length) {
                    //checks if there already is a point with same x-value
                    for (var i = 0; i < this.m_middlepoints.length; i++) {
                        var tmp = this.m_middlepoints[i].x;
                        if (p_x == this.m_middlepoints[i].x) {
                            this.m_middlepoints[i].setValues(p_x, p_y);
                            ret = false;
                            break;
                        }
                    }
                    if (i == this.m_middlepoints.length) {
                        this.m_middlepoints.push(new createjs.Point(p_x, p_y));
                    }
                }
                else {
                    this.m_middlepoints.push(new createjs.Point(p_x, p_y));
                }
                return ret;
            };
            ;
            PiecewiseLinear.prototype.removePointAtIndex = function (p_index) {
                this.m_middlepoints.splice(p_index, 1);
            };
            ;
            PiecewiseLinear.prototype.removePoint = function (p_point) {
                alert("not Implemented");
            };
            ;
            //input: index of point. output: new index of input point
            PiecewiseLinear.prototype.sortPointsByX = function (p_point) {
                var index = 0;
                var selectedPoint = this.m_middlepoints[p_point];
                var tmp = this.m_middlepoints.slice();
                //selection sort
                while (tmp.length) {
                    var minIndex = tmp.length - 1;
                    for (var p in tmp) {
                        var tnp = tmp[p].x;
                        var tnp2 = tmp[minIndex].x;
                        if (tmp[p].x < tmp[minIndex].x)
                            minIndex = parseInt(p);
                    }
                    this.m_middlepoints[index++] = tmp[minIndex];
                    tmp.splice(minIndex, 1);
                }
                this.m_startPoint = this.m_middlepoints[0];
                this.m_endPoint = this.m_middlepoints[this.m_middlepoints.length - 1];
                if (p_point != undefined) {
                    for (var i = 0; i < this.m_middlepoints.length; i++) {
                        var tmp8 = this.m_middlepoints[i].x;
                        var tmp9 = (tmp8 === selectedPoint.x);
                        var tmp10 = (this.m_middlepoints[i].x.valueOf() === selectedPoint.x.valueOf());
                        if (this.m_middlepoints[i].x.valueOf() === selectedPoint.x.valueOf())
                            return i;
                    }
                }
                return null;
            };
            PiecewiseLinear.prototype.toJSON = function () {
                return { points: this.m_middlepoints };
            };
            PiecewiseLinear.prototype.fromJSON = function (p_JSONObject) {
                this.m_middlepoints = p_JSONObject.points;
            };
            PiecewiseLinear.prototype.getPoints = function () {
                return this.m_middlepoints;
            };
            PiecewiseLinear.prototype.savePWL = function () {
                var datastream = JSON.stringify(this);
                //console.log("ValueFunction Stream: " + datastream);
                return datastream;
                ;
            };
            return PiecewiseLinear;
        }(ValueFunction));
        DST.PiecewiseLinear = PiecewiseLinear;
    })(DST = Mareframe.DST || (Mareframe.DST = {}));
})(Mareframe || (Mareframe = {}));
//# sourceMappingURL=ValueFunction.js.map