var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Mareframe;
(function (Mareframe) {
    var DST;
    (function (DST) {
        var ElementOOBase = (function () {
            function ElementOOBase(p_name) {
                this.m_connections = [];
                this.m_name = p_name;
            }
            ElementOOBase.prototype.getName = function () {
                return this.m_name;
            };
            ElementOOBase.prototype.setName = function (p_name) {
                this.m_name = p_name;
            };
            ElementOOBase.prototype.getID = function () {
                return this.m_id;
            };
            ElementOOBase.prototype.setID = function (p_id) {
                if (p_id.substr(0, 4) == "elmt") {
                    this.m_id = p_id;
                }
                else {
                    this.m_id = "elmt" + p_id;
                }
                this.m_easelElmt.name = p_id;
                return this.m_id;
            };
            ElementOOBase.prototype.getDescription = function () {
                return this.m_description;
            };
            ElementOOBase.prototype.setDescription = function (p_description) {
                this.m_description = p_description;
            };
            ElementOOBase.prototype.getUserDescription = function () {
                return this.m_userDescription;
            };
            ElementOOBase.prototype.setUserDescription = function (p_description) {
                this.m_userDescription = p_description;
            };
            ElementOOBase.prototype.getParentElements = function () {
                var elmt = this;
                var parents = [];
                this.m_connections.forEach(function (c) {
                    if (c.getOutputElement().getID() === elmt.getID()) {
                        parents.push(c.getInputElement());
                    }
                });
                //////console.log(elmt.getName() + " parents: " + parents);
                return parents;
            };
            ElementOOBase.prototype.isParentOf = function (p_elmt) {
                var retBool = false;
                for (var e in this.getChildrenElements()) {
                    ////console.log("Element: " + p_elmt.getID() + "   ChildElement: " + this.getChildrenElements()[e].getID());
                    if (this.getChildrenElements()[e].getID() == p_elmt.getID()) {
                        retBool = true;
                        break;
                    }
                }
                //console.log(" Is Parent Of: " + retBool);
                return retBool;
            };
            ElementOOBase.prototype.isChildOf = function (p_elmt) {
                var retBool = false;
                for (var e in this.getParentElements()) {
                    ////console.log("Element: " + p_elmt.getID() + "   ParentElement: " + this.getParentElements()[e].getID());
                    if (this.getParentElements()[e].getID() == p_elmt.getID()) {
                        retBool = true;
                        break;
                    }
                }
                //console.log(" Is Child Of: " + retBool);
                return retBool;
            };
            ElementOOBase.prototype.getChildrenElements = function () {
                var children = [];
                var elmt = this;
                // //console.log(this.m_connections);
                this.m_connections.forEach(function (c) {
                    ////console.log("OutputElement: " + c.getOutputElement().getID());
                    ////console.log("this Element id: " + elmt.getID());
                    if (c.getInputElement().getID() === elmt.getID()) {
                        children.push(c.getOutputElement());
                    }
                });
                //   //console.log(this.getName() + " chilxxdren: " + children);
                return children;
            };
            ElementOOBase.prototype.deleteConnection = function (p_connID) {
                alert("not imp fully imp yet (overload)");
                var key = 0;
                this.m_connections.every(function (p_conn) {
                    if (p_conn.getID() === p_connID)
                        return false;
                    else {
                        key++;
                        return true;
                    }
                });
                //console.log("Key: " + key + "  Lengthm_conn: " + this.m_connections.length);
                if (key >= this.m_connections.length)
                    return false;
                else {
                    for (var index in this.m_connections) {
                    }
                    this.m_connections.splice(key, 1);
                    //console.log("m_conn Length: " + this.m_connections.length);
                    for (var index in this.m_connections) {
                    }
                    ////console.log("Total conections: " + this.m_model.getConnectionArr().length);
                    //this.deleteConnection(p_connID);
                    ////console.log("Total conections: " + this.m_model.getConnectionArr().length);
                    return true;
                }
            };
            ElementOOBase.prototype.deleteAllConnections = function () {
                this.m_connections.forEach(function (p_conn) {
                });
            };
            ElementOOBase.prototype.addConnection = function (p_conn) {
                this.m_connections.push(p_conn);
            };
            ElementOOBase.prototype.getConnections = function () {
                return this.m_connections;
            };
            ElementOOBase.prototype.getConnectionFrom = function (p_elmt) {
                var retConnection = null;
                for (var index in this.m_connections) {
                    if (this.m_connections[index].getOutputElement().getID() == p_elmt.getID()) {
                        retConnection = this.m_connections[index];
                        break;
                    }
                }
                return retConnection;
            };
            return ElementOOBase;
        }());
        DST.ElementOOBase = ElementOOBase;
        //export interface ElementOOMca extends ElementOO {
        //}
        var ElementOOMca = (function (_super) {
            __extends(ElementOOMca, _super);
            function ElementOOMca(name, weightMethod) {
                var _this = _super.call(this, name) || this;
                _this.m_swingWeightArr = [];
                _this.m_dataArr = [];
                _this.m_weightingMetod = weightMethod;
                return _this;
            }
            ElementOOMca.prototype.getWeightingMetod = function () {
                return this.m_weightingMetod;
            };
            ElementOOMca.prototype.setweightingMethod = function (p_weight) {
                this.m_weightingMetod = p_weight;
            };
            ElementOOMca.prototype.getValueFunctionX = function () {
                return this.m_valueFunctionX;
            };
            ElementOOMca.prototype.setValueFunctionX = function (p_x) {
                this.m_valueFunctionX = p_x;
            };
            ElementOOMca.prototype.getValueFunctionY = function () {
                return this.m_valueFunctionY;
            };
            ElementOOMca.prototype.setValueFunctionY = function (p_y) {
                this.m_valueFunctionY = p_y;
            };
            ElementOOMca.prototype.getValueFunctionFlip = function () {
                return this.m_valueFunctionFlip;
            };
            ElementOOMca.prototype.setValueFunctionFlip = function (p_flip) {
                this.m_valueFunctionFlip = p_flip;
            };
            ElementOOMca.prototype.getDataBaseLine = function () {
                return this.m_dataBaseLine;
            };
            ElementOOMca.prototype.setDataBaseLine = function (p_baseLine) {
                this.m_dataBaseLine = p_baseLine;
            };
            ElementOOMca.prototype.getDataMax = function () {
                return this.m_dataMax;
            };
            ElementOOMca.prototype.setDataMax = function (p_max) {
                this.m_dataMax = p_max;
                for (var i in this.m_dataArr) {
                    if (this.m_dataArr[i] > p_max)
                        this.m_dataMax = this.m_dataArr[i];
                }
            };
            ElementOOMca.prototype.getDataMin = function () {
                return this.m_dataMin;
            };
            ElementOOMca.prototype.setDataMin = function (p_min) {
                this.m_dataMin = p_min;
                for (var i in this.m_dataArr) {
                    if (this.m_dataArr[i] < p_min)
                        this.m_dataMin = this.m_dataArr[i];
                }
            };
            ElementOOMca.prototype.getDataArrAtIndex = function (p_index) {
                if (p_index >= 0 || p_index < this.m_dataArr.length)
                    return this.m_dataArr[p_index];
                else
                    return undefined;
            };
            ElementOOMca.prototype.getDataArrLength = function () {
                return this.m_dataArr.length;
            };
            ElementOOMca.prototype.getDataUnit = function () {
                return this.m_dataUnit;
            };
            ElementOOMca.prototype.setDataUnit = function (p_unit) {
                this.m_dataUnit = p_unit;
            };
            ElementOOMca.prototype.changeDataArrAtIndex = function (p_index, p_value) {
                if (p_index >= 0 || p_index < this.m_dataArr.length)
                    this.m_dataArr[p_index] = p_value;
                if (p_value < this.m_dataMin)
                    this.m_dataMin = p_value;
                if (p_value > this.m_dataMax)
                    this.m_dataMax = p_value;
            };
            ElementOOMca.prototype.pushValueToDataArr = function (p_value) {
                this.m_dataArr.push(p_value);
            };
            ElementOOMca.prototype.deleteValueAtIndex = function (p_index) {
                this.m_dataArr.splice(p_index, 1);
            };
            ElementOOMca.prototype.dataArrLength = function () {
                return this.m_dataArr.length;
            };
            return ElementOOMca;
        }(ElementOOBase));
        DST.ElementOOMca = ElementOOMca;
        //export interface ElementOOBbn extends ElementOO {
        //    //m_data: any[][];
        //    //m_dataDim: number[];
        //    //m_minitableEaselElmt: createjs.Container;
        //getData(p_index ?: number, p_secondary ?: number): any;
        //setData(p_data: any, p_index ?: number, p_secondary ?: number): any;
        //}
        //export interface ElementOOMcaAttribute extends ElementOOMca {
        //}
        //export interface ElementOOMcaObjective extends ElementOOMca {
        //}
        //export interface ElementOOMcaAlternative extends ElementOOMca {
        //}
        //export interface ElementOOMcaGoal extends ElementOOMca {
        //}
    })(DST = Mareframe.DST || (Mareframe.DST = {}));
})(Mareframe || (Mareframe = {}));
//# sourceMappingURL=ElementOO.js.map