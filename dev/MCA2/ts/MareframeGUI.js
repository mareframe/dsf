var Mareframe;
(function (Mareframe) {
    var DST;
    (function (DST) {
        var GUIHandler = (function () {
            function GUIHandler(p_model, p_handler) {
                var _this = this;
                this.m_editorMode = false;
                this.m_showDescription = true;
                this.m_unsavedChanges = false;
                this.m_fullscreen = false;
                this.m_mcaStage = new createjs.Stage("MCATool");
                this.m_valueFnStage = new createjs.Stage("valueFn_canvas");
                this.m_controlP = new createjs.Shape();
                this.m_valueFnContainer = new createjs.Container();
                this.m_valueFnLineCont = new createjs.Container();
                this.m_valueFnSize = 100;
                this.m_mcaStageCanvas = this.m_mcaStage.canvas;
                this.m_selectionBox = new createjs.Shape();
                this.m_mcaSizeX = $(window).width();
                this.m_mcaSizeY = $(window).height();
                this.m_mcaContainer = new createjs.Container();
                this.m_googleColors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac", "#b77322", "#16d620", "#b91383", "#f4359e", "#9c5935", "#a9c413", "#2a778d", "#668d1c", "#bea413", "#0c5922", "#743411"];
                //private m_mcaBackground: createjs.Shape = new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(0, 0, this.m_mcaSizeX, this.m_mcaSizeY));
                this.m_mcaBackground = new createjs.Shape(new createjs.Graphics().beginFill("white").drawRect(0, 0, 1500, 1200));
                this.m_valFnBackground = new createjs.Shape(new createjs.Graphics().beginFill("#ffffff").drawRect(0, 0, this.m_valueFnSize, this.m_valueFnSize));
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_chartsLoaded = false;
                this.m_oldX = 0;
                this.m_oldY = 0;
                this.m_originalPressX = 0;
                this.m_originalPressY = 0;
                this.m_selectedItems = [];
                this.m_finalScoreChartOverview = new google.visualization.ColumnChart($("#finalScoreChartOverview_div").get(0));
                //private m_finalScoreChartTab: google.visualization.ColumnChart = new google.visualization.ColumnChart($("#finalScoreChartTab_div").get(0));
                this.m_SAScatterChart = new google.visualization.ScatterChart($("#lineChart_div").get(0));
                this.m_SATableChart = new google.visualization.Table($("#tableChart_div").get(0));
                this.m_pointOld = null;
                this.m_pointCurrent = null;
                this.m_pwlDataArray = [['xx', 'yy', { role: 'annotation' }, 'y1', 's'], [0, 1000, null, 1200, 1], [10, 3000, null, 3200, 2], [20, 1500, null, 1700, 3], [30, 500, null, 700, 3], [40, 1800, null, 2000, 4], [100, 2000, null, 2200, 5]];
                this.m_altData = [['Alt', 'Value'], ['car1', 0.111], ['car2', 0.222], ['car3', 0.395], ['car4', 0.765]];
                //private m_pwlDataArray: any[][] = [['xx', 'yy', { role: 'annotation' }, 'y1', 's'], [0, 1000, null, 1200, 1]];
                //private m_altData: any[][] = [['Alt', 'Value'], ['car1', 0.111]];
                this.m_lineOptions = {
                    hAxis: {
                        //title: 'Slidervalue', minValue: this.m_pwlDataArray[1][0], maxValue: this.m_pwlDataArray[this.m_pwlDataArray.length - 1][0]
                        title: 'Slidervalue', minValue: 0, maxValue: 1
                    },
                    vAxis: {
                        title: 'Cumulative Value'
                    },
                    title: '',
                    chartArea: { left: '5%', top: '15%', width: '65%', height: '60%' },
                    lineWidth: 1,
                    explorer: {}
                };
                this.m_tableOptions = {
                    //height: 400,
                    width: 400
                };
                this.m_finalScoreChartOptions = {
                    //width: 200,
                    //height: 100,
                    vAxis: { minValue: 0, title: 'Cumulative Value' },
                    hAxis: {},
                    legend: { position: 'top', maxLines: 3 },
                    bar: { groupWidth: '75%' },
                    animation: { duration: 500, easing: "out" },
                    isStacked: true,
                    focusTarget: 'category'
                };
                this.m_elementColors = [["#efefff", "#15729b", "#dfdfff", "#000000"], ["#ffefef", "#c42f33", "#ffdfdf", "#000000"], ["#fff6e0", "#f6a604", "#fef4c6", "#000000"], ["#efffef", "#2fc433", "#dfffdf", "#000000"]];
                this.m_trashBin = [];
                this.m_hasGoal = false;
                this.m_attributeCount = 0;
                this.m_alternativCount = 0;
                this.m_attributeIndex = [];
                this.m_this = this;
                this.m_readyForSA = false;
                this.m_skipUpdateDropDowns = false;
                this.m_idCounter = 0;
                this.m_trafficLightsON = false;
                this.m_finalScoreShadow = new createjs.Shadow("#000000", 5, 5, 10);
                this.m_datatableScrollTop = 0;
                this.m_datatableScrollLeft = 0;
                this.handleScoreAsText = function (e) {
                    console.log("handleScoreAsText: " + e.data.objective);
                    $("#finalScoreScoreAsText_Dialog").dialog("open");
                    var tmp167 = _this.m_finalScoreChosenObjective;
                    var tmp168 = _this.getCritSelected();
                    //var tmp169 = this.m_model.getScore2AsText(tmp167, 1, tmp168 - tmp167.m_criteriaLevel);
                    var tmp169 = _this.m_model.getScore2(tmp167, 1, tmp168 - tmp167.m_criteriaLevel);
                    var scoreAsTextDialog_content_div;
                    var dialog;
                    dialog = document.getElementById("finalScoreScoreAsText_Dialog");
                    if (!dialog) {
                        scoreAsTextDialog_content_div = document.createElement("div");
                    }
                    else {
                        dialog.innerHTML = "";
                    }
                    //dialog.appendChild(scoreAsTextDialog_content_div);
                    //scoreAsTextDialog_content_div.innerHTML = "";
                    var scoreAsTextTable;
                    scoreAsTextTable = document.createElement("table");
                    scoreAsTextTable.id = 'scoreAsTextTable';
                    dialog.appendChild(scoreAsTextTable);
                    var scoreAsTextHeaderRow = document.createElement("tr");
                    var scoreAsTextTopCorner = document.createElement("th");
                    scoreAsTextTable.appendChild(scoreAsTextHeaderRow);
                    scoreAsTextHeaderRow.appendChild(scoreAsTextTopCorner);
                    for (var i in _this.m_model.m_altIndex) {
                        var col = document.createElement("th");
                        scoreAsTextHeaderRow.appendChild(col);
                        var tmp45 = _this.m_model.m_altIndex[i];
                        //var tmp46 = 
                        col.innerHTML = _this.m_model.getElementArr()[_this.m_model.m_altIndex[i]].getName();
                    }
                    for (var alt in tmp169) {
                        var row = document.createElement("tr");
                        scoreAsTextTable.appendChild(row);
                        for (var _i = 0, _a = tmp169[alt]; _i < _a.length; _i++) {
                            var sco = _a[_i];
                            var col = document.createElement("td");
                            row.appendChild(col);
                            if (typeof sco == "number")
                                col.innerHTML = (Math.round(sco * 10000) / 10000).toString();
                            else
                                col.innerHTML = sco;
                        }
                    }
                    //var tmp169 = this.m_model.getScore2AsText(tmp167, 1, tmp168 - tmp167.m_criteriaLevel - 1);
                    if (tmp168 != tmp167.m_criteriaLevel) {
                        var tmp169 = _this.m_model.getScore2(tmp167, 1, tmp168 - tmp167.m_criteriaLevel - tmp168);
                        for (var alt in tmp169) {
                            var row = document.createElement("tr");
                            scoreAsTextTable.appendChild(row);
                            for (var _b = 0, _c = tmp169[alt]; _b < _c.length; _b++) {
                                var sco = _c[_b];
                                var col = document.createElement("td");
                                row.appendChild(col);
                                if (typeof sco == "number")
                                    col.innerHTML = (Math.round(sco * 10000) / 10000).toString();
                                else
                                    col.innerHTML = sco;
                            }
                        }
                    }
                };
                this.importCSV = function (e) {
                    _this.m_handler.getFileIO().importAttributesAndAlternativesFromCSV(_this.m_model, _this.importStage);
                    //if (!this.m_model.m_bbnMode) {
                    //    this.m_handler.getFileIO().importAttributesAndAlternativesFromCSV(this.m_model, this.importStage)
                    //}
                };
                this.changeAlt = function (e) {
                    var $disAlt = $("#disAlt_check");
                    var elmt = _this.m_model.getElement(_this.m_altId);
                    if (!elmt.m_disregard) {
                        $disAlt.prop("checked", true);
                        //$disAlt.siblings().html("Include Alternative");
                        elmt.m_disregard = true;
                    }
                    else {
                        $disAlt.prop("checked", false);
                        //$disAlt.siblings().html("Exclude Alternative");
                        elmt.m_disregard = false;
                    }
                    //this.updateTable(this.m_model.getDataMatrix(false));
                    _this.m_updateMCATables = true;
                    _this.m_updateMCAStage = true;
                    //this.updateSATableData();
                    //this.updateSA();
                    _this.m_skipUpdateDropDowns = true;
                };
                this.setShowDescription = function (cb) {
                    this.m_showDescription = cb.currentTarget.checked;
                    if (this.m_showDescription) {
                        $("#description_div").show();
                        $("#showDescription").siblings('label').html("Hide description");
                    }
                    else {
                        $("#description_div").hide();
                        $("#showDescription").siblings('label').html("Show description");
                    }
                };
                this.handleEditorMode = function (cb) {
                    $("#editorMode").blur();
                    if (_this.m_editorMode) {
                        if ($("#cnctTool").prop("checked")) {
                        }
                        else {
                        }
                        _this.m_editorMode = false;
                    }
                    else {
                        //$("#modeStatus").html("Editor Mode");
                        _this.m_editorMode = true;
                    }
                    _this.updateEditorMode();
                };
                this.setAutoUpdate = function (cb) {
                    ////console.log(cb);
                    this.m_model.setAutoUpdate(cb.currentTarget.checked);
                    if (cb.currentTarget.checked) {
                        $("#autoUpdateStatus").html("Updating automatically");
                        $("#updateMdl").hide();
                    }
                    else {
                        $("#autoUpdateStatus").html("");
                        $("#updateMdl").show();
                    }
                    ////console.log("auto update: " + this.m_model.m_autoUpdate);
                };
                this.handleSlide = function (event, ui) {
                    var tthis = _this;
                    var tmo = _this.m_pwlDataArray;
                    ////console.log("HandleSlide: pwlData Before: " + this.m_pwlDataArray);
                    $("#sliderValDebug").html(ui.value);
                    if (_this.m_SAChosenElement != undefined)
                        //$("#sliderValNormDebug").html(''+this.m_SAChosenElement.getPwlVF().getValue(ui.value)); 
                        _this.m_SASliderValue = ui.value;
                    var tmp5 = _this.m_pwlDataArray;
                    //$("#sliderValNormDebug").html( ui.value );
                    if (_this.m_pointOld !== null)
                        _this.m_pwlDataArray.splice(_this.m_pwlDataArray.indexOf(_this.m_pointOld), 1);
                    _this.m_pointCurrent = [ui.value, 1];
                    //find current point position in pwlDataArray
                    var i = 2;
                    ////console.log("i: " + i + "  uiVal: " + ui.value + "  pwlAt_i: " + pwlDataArray[pwlDataArray.length-1][0]);
                    ////console.log(this.m_pwlDataArray);
                    var tmp9 = _this.m_pwlDataArray[_this.m_pwlDataArray.length - 1][0];
                    if (ui.value > _this.m_pwlDataArray[_this.m_pwlDataArray.length - 1][0]) {
                        ////console.log("hrll " + this.m_pointCurrent[0]);
                        var tmp6 = _this.m_pwlDataArray;
                        _this.m_pwlDataArray.splice(_this.m_pwlDataArray.length, 0, _this.m_pointCurrent);
                        var tmp7 = _this.m_pwlDataArray;
                    }
                    else {
                        while (i < _this.m_pwlDataArray.length) {
                            ////console.log(i);
                            var tmp = _this.m_pwlDataArray[i][0];
                            if (ui.value > _this.m_pwlDataArray[i][0]) {
                                i++;
                            }
                            else {
                                ////console.log("before: " + this.m_pwlDataArray);
                                _this.m_pwlDataArray.splice(i, 0, _this.m_pointCurrent);
                                break;
                            }
                        }
                    }
                    ////console.log(this.m_pwlDataArray);
                    tmp5 = _this.m_pwlDataArray;
                    var tmp = _this.m_pwlDataArray[i + 1][1];
                    var tmp2 = _this.m_pwlDataArray[i - 1][1];
                    var tmp3 = _this.m_pwlDataArray[i + 1][0];
                    var tmp4 = _this.m_pwlDataArray[i - 1][0];
                    for (var k = 1; k < _this.m_pwlDataArray[0].length; k++) {
                        var a = (_this.m_pwlDataArray[i + 1][k] - _this.m_pwlDataArray[i - 1][k]) / (_this.m_pwlDataArray[i + 1][0] - _this.m_pwlDataArray[i - 1][0]);
                        var b = _this.m_pwlDataArray[i + 1][k] - a * _this.m_pwlDataArray[i + 1][0];
                        _this.m_pointCurrent[k] = a * _this.m_pwlDataArray[i][0] + b;
                    }
                    ////console.log("hrll " + this.m_pointCurrent[0]);
                    //this.m_pointCurrent[0] = this.m_SASliderValue;
                    _this.m_pointCurrent[0] = ui.value;
                    ////console.log("hrll " + this.m_pointCurrent[0]);
                    //for (var k = 1; k < this.m_pwlDataArray[0].length; k++) {
                    //    this.m_pointCurrent[k] = 0.5+k*0.05;
                    //}
                    //pwlDataArray.push(pointCurrent);
                    ////console.log(this.m_pwlDataArray);
                    _this.m_pointOld = _this.m_pointCurrent;
                    var tmmp2 = _this.m_SAChosenElement;
                    var tmmp3 = _this.m_SAChosenSubElement;
                    var tmmp = _this.m_SAChosenSubElement.getConnectionFrom(_this.m_SAChosenElement);
                    //var finalScores = this.m_model.getScore(this.m_SAChosenSubElement, this.m_SAChosenElement, ui.value);
                    //for (var k = 1; k < this.m_altData.length; k++) {
                    //    this.m_altData[k][1] = 0;
                    //}
                    //for (var i = 3; i < finalScores.length - 2; i++) {
                    //    this.m_altData[i - 2][0] = finalScores[i][0];
                    //    for (var j = 1; j < finalScores[0].length; j++) {
                    //        this.m_altData[i - 2][1] += finalScores[i][j];
                    //        //var tmp = this.m_altData[i - 2][1];
                    //    }
                    //}
                    var tmp11 = _this.m_altData;
                    var tmp12 = _this.m_pwlDataArray;
                    //this.updateChartData(this.m_SAChosenElement);
                    //this.setSliderValue();
                    _this.updateSATableData();
                    _this.updateSA();
                    //console.log("HandleSlide: pwlData After: " + this.m_pwlDataArray);
                };
                this.selectElementChange = function (p_evt) {
                    var tthis = _this;
                    _this.m_SAChosenElement = _this.m_model.getElement($("#elementSelect > option:selected").attr('id').substring(2));
                    _this.updateSASubDropdown();
                    var tmp10 = _this.m_SASliderValue;
                    if (_this.m_SAChosenElement.getType() === 100) {
                        $("#sliderControl_div").slider('option', 'min', _this.m_SAChosenElement.getDataMin())
                            .slider('option', 'max', _this.m_SAChosenElement.getDataMax())
                            .slider('option', 'value', _this.m_SASliderValue)
                            .slider('option', 'step', (_this.m_SAChosenElement.getDataMax() - _this.m_SAChosenElement.getDataMin()) / 100);
                        $("#sliderValNormDebug").html(' ' + _this.m_SASliderValue);
                        var tmp11 = _this.m_SAChosenElement.getDataMax();
                        var tmp12 = _this.m_SAChosenElement.getDataMin();
                        _this.m_lineOptions.hAxis.maxValue = _this.m_SAChosenElement.getDataMax();
                        _this.m_lineOptions.hAxis.minValue = _this.m_SAChosenElement.getDataMin();
                    }
                    else {
                        // if
                        $("#sliderControl_div").slider('option', 'min', 0)
                            .slider('option', 'max', 100)
                            .slider('option', 'value', _this.m_SASliderValue)
                            .slider('option', 'step', 1); //.slider('option', 'value', this.m_SAChosenElement.getDataMin());                 
                        _this.m_lineOptions.hAxis.maxValue = 100;
                        _this.m_lineOptions.hAxis.minValue = 0;
                    }
                    _this.m_pointOld = null;
                    if (_this.m_SAChosenElement != null && _this.m_SAChosenSubElement != null) {
                        _this.updateChartData(_this.m_SAChosenElement);
                    }
                    var tmp13 = _this.m_SAChosenSubElement;
                    _this.updateSATableData();
                    _this.setSliderValue();
                    _this.updateSA();
                };
                this.selectSubElementChange = function (p_evt) {
                    _this.m_SAChosenSubElement = _this.m_model.getElement($("#elementSubSelect > option:selected").attr('id').substring(3));
                    var tmp2 = _this.m_SAChosenSubElement;
                    //this.updateChartData(this.m_SAChosenSubElement);
                    var tmp7 = _this.m_alternativCount;
                    for (var i = 0; i < _this.m_alternativCount; i++) {
                        var tmp = _this.m_SAChosenSubElement.getType();
                        if (_this.m_SAChosenSubElement.getType() === 100) {
                            var tmp5 = _this.m_lineOptions.hAxis.maxValue;
                            _this.m_lineOptions.hAxis.maxValue = _this.m_SAChosenElement.getDataMax();
                            _this.m_lineOptions.hAxis.minValue = _this.m_SAChosenElement.getDataMin();
                        }
                        else {
                            var tmp6 = _this.m_lineOptions.hAxis.maxValue;
                            _this.m_lineOptions.hAxis.maxValue = _this.m_SAChosenElement.getDataMax();
                            _this.m_lineOptions.hAxis.minValue = _this.m_SAChosenElement.getDataMin();
                        }
                    }
                    _this.m_pointOld = null;
                    _this.setSliderValue();
                    if (_this.m_SAChosenElement != null && _this.m_SAChosenSubElement != null) {
                        _this.updateChartData(_this.m_SAChosenElement);
                    }
                    _this.updateSATableData();
                    _this.updateSA();
                };
                this.updateFinalScoresDropDowns = function () {
                    _this.updateFinalScoreObejctiveSelect();
                    _this.updateFinalScoreSegmentSelect();
                };
                this.updateFinalScoreObejctiveSelect = function () {
                    $("#finalScoreObjectiveOverview_select > option").remove();
                    $("#finalScoreObjectiveTab_select > option").remove();
                    if (_this.m_model !== undefined) {
                        for (var _i = 0, _a = _this.m_model.getElementArr(); _i < _a.length; _i++) {
                            var e = _a[_i];
                            if (e.getType() == 103) {
                                $("#finalScoreObjectiveOverview_select").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                            }
                        }
                        for (var _b = 0, _c = _this.m_model.getElementArr(); _b < _c.length; _b++) {
                            var e = _c[_b];
                            if (e.getType() == 101) {
                                $("#finalScoreObjectiveOverview_select").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                            }
                        }
                        for (var _d = 0, _e = _this.m_model.getElementArr(); _d < _e.length; _d++) {
                            var e = _e[_d];
                            if (e.getType() == 100) {
                                $("#finalScoreObjectiveOverview_select").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                            }
                        }
                        $("#finalScoreObjectiveOverview_select").selectmenu('refresh');
                    }
                    _this.updateFinalScoreSegmentSelect();
                    _this.updateFinalScoreBarsSelect();
                };
                this.updateFinalScoreSegmentSelect = function () {
                    _this.determineMaxCriteriaLevel();
                    $("#finalScoreSegmentOverview_select > option").remove();
                    $("#finalScoreSegmentTab_select > option").remove();
                    var t = $("#finalScoreObjectiveOverview_select").attr('id');
                    var t2 = $("#finalScoreObjectiveOverview_select > option:selected").attr('id');
                    var e = _this.m_model.getElement($("#finalScoreObjectiveOverview_select > option:selected").attr('id').substring(2)); //id of the element selected in the dropdown
                    var critSelected = 2;
                    for (var i = e.m_criteriaLevel; i < _this.m_maxCriteriaLevel + 1; i++) {
                        $("#finalScoreSegmentOverview_select").append("<option id='criteria" + i + "'>Criteria " + i + "</option>");
                    }
                    //$("#finalScoreSegment_select").append("<option id='criteriaAlts'>Alternatives</option>");
                    //var tmp = $("#finalScoreObjective_select > option:selected").attr('id');
                    //var tmp2 = $("#finalScoreSegment_select > option:selected").attr('id');
                    $("#finalScoreSegmentOverview_select").selectmenu('refresh');
                };
                this.updateFinalScoreBarsSelect = function () {
                };
                this.handleFinalScoreObjectiveSelect = function () {
                    var critSelected = 1000;
                    var t = $("#finalScoreObjectiveOverview_select").attr('id');
                    var t2 = $("#finalScoreObjectiveOverview_select > option:selected").attr('id');
                    var e = _this.m_model.getElement($("#finalScoreObjectiveOverview_select > option:selected").attr('id').substring(2)); //id of the element selected in the dropdown
                    //$("#finalScoreObjectiveOverview_select").val( "hovhvo").selectmenu('refresh');
                    _this.updateFinalScoreSegmentSelect();
                    _this.m_finalScoreChosenObjective = e;
                    _this.updateFinalScores(e, _this.getCritSelected());
                    _this.removeAllShadows();
                    _this.addShadowsToParents(e);
                    e.m_easelElmt.shadow = _this.m_finalScoreShadow;
                    _this.m_updateMCAStage = true;
                };
                this.handleFinalScoreSegmentSelect = function () {
                    var e = _this.m_model.getElement($("#finalScoreObjectiveOverview_select > option:selected").attr('id').substring(2)); //id of the element selected in the dropdown
                    var tmp = _this.getCritSelected();
                    _this.updateFinalScores(_this.m_finalScoreChosenObjective, _this.getCritSelected());
                    _this.removeAllShadows();
                    e.m_easelElmt.shadow = _this.m_finalScoreShadow;
                    _this.addShadowsToParents(e);
                    _this.m_updateMCAStage = true;
                };
                this.handleFinalScoreBarsSelect = function () {
                };
                this.m_handler = p_handler;
                this.saveChanges = this.saveChanges.bind(this);
                $("#tabs").tabs();
                $(window).resize(function () {
                    $("#elementSelect").selectmenu("option", "width", $("#dropdownControl_div").width());
                    $("#elementSubSelect").selectmenu("option", "width", $("#dropdownControl_div").width());
                });
                $("#finalScoreObjectiveOverview_select").selectmenu({
                    select: this.handleFinalScoreObjectiveSelect,
                    width: 150
                });
                $("#finalScoreSegmentOverview_select").selectmenu({
                    select: this.handleFinalScoreSegmentSelect,
                    value: 0,
                    width: 150
                });
                $("#elementSelect").selectmenu({
                    select: this.selectElementChange,
                    value: 0,
                    width: $("#dropdownControl_div").width()
                });
                $("#elementSubSelect").selectmenu({
                    select: this.selectSubElementChange,
                    value: 0,
                    width: $("#dropdownControl_div").width()
                });
                //$("#MCATool").resizable();
                //Change layout if it is not in marefram mode
                if (!this.m_handler.isMareframMode()) {
                    $("#logo").attr("src", "img/tokni_logo.png");
                    $("#logo").attr("style", "height:80px");
                    $("#webpage").attr("href", "http://www.tokni.com");
                    $(".europe-map-back").hide();
                    $("#model_description").html("This is the BBN tool. Red nodes represent decision nodes, blue nodes represent chance nodes, and yellow nodes represent value nodes. You may doubleclick on each node below, to access the properties tables for that node. To set a decision click on a choice in the table next to decision nodes.");
                    $(".europe-map-zoom").hide();
                    $(".col-md-2").hide();
                    $(".col-md-6").hide();
                    $("#ui_css").attr("href", "jQueryUI/jquery-ui_light.css");
                    $("#dialog_css").attr("href", "css/dialog_tokni.css");
                }
                var mareframeGUI = this;
                if (p_model.m_bbnMode) {
                    $("#detailsDialog").on("closedialog", function (event, ui) {
                        //console.log("MFGUI colsing dialog BBN");
                        if (mareframeGUI.m_unsavedChanges) {
                            //console.log("unsaved changes");
                            if (!confirm("You have unsaved changes. Pressing OK will close the window and discard all changes.")) {
                                return false;
                            }
                            $("#valuesTable_div").show();
                        }
                    });
                    $("#detailsDialog").on('dialogclose', function (event) {
                        $("#valuesTable_div").hide();
                    });
                    $("#submit").on("click", this.saveChanges);
                    $("#values").on("click", this.showValues);
                    //this.setEditorMode = this.setEditorMode.bind(this);
                    this.setAutoUpdate = this.setAutoUpdate.bind(this);
                    $("#MCADataTable").hide();
                    $("#addDataRow").hide();
                    this.m_mcaStageCanvas.width = $(window).width();
                }
                else {
                    $("#model_description").html("This is the Mareframe MCA tool. Data has been loaded into the table on the right. You may doubleclick on each element below, to access the properties panel for that element. If you doubleclick on one of the red or green elements, you may adjust the weights of it's child elements, and thus the data it points to. In the chart at the bottom, you will see the result of the analysis, with the tallest column being the highest scoring one.<a href='MCA_instructions.pdf'> MCA Instructions</a>");
                    //this.setEditorMode = this.setEditorMode.bind(this);
                    this.m_editorMode = false;
                    $("#newDcmt").hide();
                    $("#lodDcmtDiv").show();
                    $("#elementType").hide();
                    $("#selectModelDiv").hide();
                    $("#submit").hide();
                    $("#showDescriptionButtonLabel").hide();
                    $("label[for='fullscreen']").hide();
                    $("#autoUpdate").hide();
                    $("label[for='autoUpdate']").hide();
                    $("#updateMdl").hide();
                    $("#weightingMethodSelector").hide();
                    this.m_pwWidget = new DST.TKN_Widget("pwl", this.m_handler.getFileIO(), this);
                    $("#sliderControl_div").slider().css('position', 'absolute');
                    this.updateSADropdown();
                }
                this.allModeltoconsole = this.allModeltoconsole.bind(this);
                this.allConnectionstoconsole = this.allConnectionstoconsole.bind(this);
                this.addDataRowClick = this.addDataRowClick.bind(this);
                this.pressMove = this.pressMove.bind(this);
                this.pressUp = this.pressUp.bind(this);
                this.mouseDown = this.mouseDown.bind(this);
                this.dblClick = this.dblClick.bind(this);
                this.clearSelection = this.clearSelection.bind(this);
                this.tick = this.tick.bind(this);
                this.importStage = this.importStage.bind(this);
                this.moveValFnCP = this.moveValFnCP.bind(this);
                this.updateValFnCP = this.updateValFnCP.bind(this);
                this.updateDataTableDiv = this.updateDataTableDiv.bind(this);
                this.flipValFn = this.flipValFn.bind(this);
                this.linearizeValFn = this.linearizeValFn.bind(this);
                this.updateTable = this.updateTable.bind(this);
                this.connectTo = this.connectTo.bind(this);
                this.updateConnection = this.updateConnection.bind(this);
                this.createNewChance = this.createNewChance.bind(this);
                this.createNewDec = this.createNewDec.bind(this);
                this.createNewValue = this.createNewValue.bind(this);
                this.createNewElement = this.createNewElement.bind(this);
                this.deleteSelected = this.deleteSelected.bind(this);
                this.resetDcmt = this.resetDcmt.bind(this);
                this.updateModel = this.updateModel.bind(this);
                this.mouseUp = this.mouseUp.bind(this);
                this.selectAll = this.selectAll.bind(this);
                this.saveModel = this.saveModel.bind(this);
                this.loadModel = this.loadModel.bind(this);
                this.selectModel = this.selectModel.bind(this);
                this.clickedDecision = this.clickedDecision.bind(this);
                this.fullscreen = this.fullscreen.bind(this);
                this.cnctStatus = this.cnctStatus.bind(this);
                this.optionTypeChange = this.optionTypeChange.bind(this);
                this.optionMethodChange = this.optionMethodChange.bind(this);
                this.editTableData = this.editTableData.bind(this);
                this.m_model = p_model;
                this.m_mcaBackground.name = "hitarea";
                this.updateEditorMode = this.updateEditorMode.bind(this);
                this.m_mcaBackground.addEventListener("mousedown", this.mouseDown);
                this.m_controlP.graphics.f("#0615b4").s("#2045ff").rr(0, 0, 6, 6, 2);
                this.m_valFnBackground.addEventListener("pressmove", this.moveValFnCP);
                this.m_valFnBackground.addEventListener("mousedown", this.downValFnCP);
                this.m_mcaBackground.addEventListener("pressmove", this.pressMove);
                this.m_mcaBackground.addEventListener("pressup", this.pressUp);
                this.m_controlP.mouseChildren = false;
                $("#finalScoreSegmentOverview_select").on("change", this.handleFinalScoreSegmentSelect);
                $("#finalScoreBars_select").on("change", this.handleFinalScoreBarsSelect);
                $("#selectModel").on("change", this.selectModel);
                $("#MCAelmtType").on("change", this.optionTypeChange);
                $("#elementSelect").on("change", this.selectElementChange);
                $("#elementSubSelect").on("change", this.selectSubElementChange);
                $("#sliderControl_div").on("slide", this.handleSlide);
                $("#MCAWeightingMethod").on("change", this.optionMethodChange);
                $("#debugButton").on("click", this.allModeltoconsole);
                $("#debugConnect").on("click", this.allConnectionstoconsole);
                $("#valueFn_Linear").on("click", this.linearizeValFn);
                $("#valueFn_Flip").on("click", this.flipValFn);
                $("#newElmt").on("click", this.createNewElement);
                $("#newChance").on("click", this.createNewChance);
                $("#newDec").on("click", this.createNewDec);
                $("#newValue").on("click", this.createNewValue);
                $("#deleteElmt").on("click", this.deleteSelected);
                $("#editorMode").on("click", this.handleEditorMode);
                $("#showDescription").on("click", this.setShowDescription);
                $("#autoUpdate").on("click", this.setAutoUpdate);
                $("#resetDcmt").on("click", this.resetDcmt);
                $("#updateMdl").on("click", this.updateModel);
                $("#selectAllElmt").on("click", this.selectAll);
                $("#savDcmt").on("click", this.saveModel);
                $("#downloadLink").on("click", function (evt) {
                    $("#saveFile_div").hide();
                });
                $("#fullscreen").on("click", this.fullscreen);
                $("#cnctTool").on("click", this.cnctStatus);
                $("#addDataRow").on("click", this.addDataRowClick);
                this.m_mcaBackground.addEventListener("pressup", this.mouseUp);
                $("#lodDcmt").on("change", this.loadModel);
                $("#lodDcmt").on("click", function () {
                    this.value = null;
                });
                $("#import").on("change", this.importCSV);
                var gui = this;
                $("#saveFile_div").dblclick(function () {
                    var $filename = $("#filename");
                    var oldText = $filename.attr("value");
                    if (oldText === undefined)
                        oldText = $filename.html();
                    $filename.html("<input type='text' value= '" + oldText + "'>");
                    $filename.children().first().focus();
                    $filename.children().first().keypress(function (e) {
                        if (e.which == 13) {
                            var newText = $(this).val();
                            if (newText.length < 1) {
                                $filename.html(oldText);
                                newText = oldText;
                            }
                            $filename.text(newText);
                            oldText = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                            var saveName = oldText + ".xdsl";
                            gui.m_handler.getFileIO().saveModel(gui.m_model, saveName);
                        }
                    });
                    $filename.children().first().blur(function () {
                        var newText = $(this).val();
                        if (newText.length < 1) {
                            $filename.html(oldText);
                            newText = oldText;
                        }
                        $filename.text(newText);
                        oldText = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                        var saveName = oldText + ".xdsl";
                        gui.m_handler.getFileIO().saveModel(gui.m_model, saveName);
                    });
                });
                $("#disAlt_check").on("click", this.changeAlt);
                $("#disAlt_check").checkboxradio();
                $("#finalScoreScoreAsText_Button").on("click", { objective: 'obj', criteria: 'cri' }, this.handleScoreAsText);
                $("#finalScoreScoreAsText_Dialog").dialog({
                    autoOpen: false,
                    resizable: true,
                    height: 600,
                    width: 800,
                    show: {
                        effect: "scale",
                        duration: 400
                    },
                    hide: {
                        //effect: "scale",
                        effect: "explode",
                        duration: 400
                    },
                    modal: false,
                    close: function () {
                        console.log("closing dialog html");
                    },
                    //beforeclose: function (){ //console.log("beforeclosing dialog");},
                    buttons: {
                        Close: function () {
                            $(this).dialog("close");
                        },
                    } // end buttons
                });
                this.m_mcaStage.addChild(this.m_mcaBackground);
                //this.m_mcaBackground.h
                this.m_mcaStage.addChild(this.m_mcaContainer);
                this.m_valueFnStage.addChild(this.m_valFnBackground);
                this.m_valueFnStage.addChild(this.m_valueFnLineCont);
                this.m_valueFnStage.addChild(this.m_valueFnContainer);
                this.m_valueFnStage.addChild(this.m_controlP);
                createjs.Ticker.addEventListener("tick", this.tick);
                createjs.Ticker.setFPS(60);
                $("#debug").hide();
                $("#MCADataTable").hide();
                $("#SenAna").hide();
                $("#finalScoreOverview_div").hide();
                this.updateEditorMode();
                $("#pwl_div").show();
            }
            GUIHandler.prototype.determineMaxCriteriaLevel = function () {
                this.m_maxCriteriaLevel = 0;
                for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                    var elmt = _a[_i];
                    if (elmt.m_criteriaLevel > this.m_maxCriteriaLevel)
                        this.m_maxCriteriaLevel = elmt.m_criteriaLevel;
                }
            };
            GUIHandler.prototype.setHasGoal = function (p_goal) {
                this.m_hasGoal = true;
            };
            GUIHandler.prototype.isReadyForSA = function () {
                var ret = true;
                if (this.m_model.getMainObj()) {
                    for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                        var elmt = _a[_i];
                        if (elmt.getType() !== 103 && elmt.getType() !== 102) {
                            if (!this.m_model.getMainObj().isAncestorOf(elmt)) {
                                ret = false;
                                break;
                            }
                            if (elmt.getType() === 101 && elmt.getConnections().length <= 1) {
                                ret = false;
                                break;
                            }
                        }
                        else if (elmt.getType() === 103) {
                            if (elmt.getConnections().length !== 0) {
                                for (var _b = 0, _c = elmt.getConnections(); _b < _c.length; _b++) {
                                    var con = _c[_b];
                                    if (con.getInputElement().getType() !== 100 && con.getInputElement().getType() !== 101) {
                                        ret = false;
                                        break;
                                    }
                                }
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
                else {
                    ret = false;
                }
                if (this.m_alternativCount < 1) {
                    ret = false;
                    return ret;
                }
                return ret;
            };
            GUIHandler.prototype.se = function () { };
            GUIHandler.prototype.updateAlternativeCount = function () {
                this.m_alternativCount = 0;
                var tmp120 = this.m_model;
                var tmp121 = this.m_model.getElementArr();
                for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (i.getType() === 102)
                        if (i.m_disregard == false)
                            this.m_alternativCount++;
                }
            };
            GUIHandler.prototype.updateAtributeIndex = function () {
                this.m_attributeIndex.splice(0, this.m_attributeIndex.length);
                for (var i in this.m_model.getElementArr()) {
                    console.log("Type:" + this.m_model.getElementArr()[i].getType());
                    if (this.m_model.getElementArr()[i].getType() == 100)
                        //console.log("Type:" + this.m_model.getElementArr()[i].getType());
                        if (this.m_model.getElementArr()[i].m_disregard != true)
                            this.m_attributeIndex.push(i);
                }
            };
            GUIHandler.prototype.editTableData = function (p_evt) {
                //private editTableData(p_evt: createjs.MouseEvent) {
                this.updateAtributeIndex();
                var gui = this;
                var id = "#" + p_evt.target.id;
                this.m_originalName = $("#" + p_evt.target.id)[0].textContent;
                if (this.m_model.getAutoUpdate()) {
                    $("#updateMdl").hide();
                }
                $(id).addClass("editable");
                $(id).html("<input type='text' value='" + this.m_originalName + "' />");
                $(id).children().first().focus();
                $(id).children().first().keypress(function (e) {
                    if (e.which == 13) {
                        var newText = $(this).val();
                        if (newText.length < 1) {
                            $("#info_name").html(gui.m_originalName);
                            newText = gui.m_originalName;
                        }
                        $(this).parent().text(newText);
                        gui.m_originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                        var tableX = id.slice(10).split("x")[0];
                        var tableY = id.slice(10).split("x")[1];
                        if (parseInt(tableX) !== 0) {
                            var elmt = gui.m_model.getElementArr()[gui.m_attributeIndex[parseInt(tableX) - 1]];
                            if (parseInt(tableY) === 0) {
                                elmt.setName(gui.m_originalName);
                            }
                            if (parseInt(tableY) === 1) {
                                elmt.setDataMin(parseFloat(gui.m_originalName));
                            }
                            if (parseInt(tableY) === 2) {
                                elmt.setDataBaseLine(parseFloat(gui.m_originalName));
                            }
                            if (parseInt(tableY) > 1 && parseInt(tableY) < gui.m_alternativCount + 3) {
                                elmt.changeDataArrAtIndex(parseInt(tableY) - 3, parseFloat(gui.m_originalName));
                            }
                            if (parseInt(tableY) === gui.m_alternativCount + 3) {
                                elmt.m_dataUnit = gui.m_originalName;
                            }
                            if (parseInt(tableY) === gui.m_alternativCount + 4) {
                                elmt.setDataMax(parseFloat(gui.m_originalName));
                            }
                        }
                        var scrollPos = $("#MCADataTable").scrollTop();
                        gui.m_datatableScrollTop = $(".fht-fixed-body > .fht-tbody").scrollTop();
                        gui.m_datatableScrollLeft = $(".fht-fixed-body > .fht-tbody").scrollLeft();
                        var tmp34 = gui.m_model.getDataMatrix(true);
                        gui.updateTable(gui.m_model.getDataMatrix(true));
                        $(".fht-fixed-body > .fht-tbody").scrollTop(gui.m_datatableScrollTop);
                        $(".fht-fixed-body > .fht-tbody").scrollLeft(gui.m_datatableScrollLeft);
                        if (gui.m_readyForSA) {
                            gui.updateFinalScores(gui.m_finalScoreChosenObjective, gui.getCritSelected());
                            if (gui.m_SAChosenElement != null && gui.m_SAChosenSubElement != null) {
                                gui.updateChartData(gui.m_SAChosenElement);
                                gui.updateSA();
                            }
                            gui.m_updateMCAStage = true;
                        }
                    }
                    $(this).parent().removeClass("editable");
                });
                $(id).children().first().blur(function () {
                    var newText = $(this).val();
                    $(this).parent().html(gui.m_originalName);
                    //originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                    $(this).parent().removeClass("editable");
                });
            };
            GUIHandler.prototype.optionTypeChange = function (p_evt) {
                this.m_idCounter++;
                var elmt = $("#detailsDialog").data("element");
                var oldType = elmt.getType();
                switch (oldType) {
                    case 100:
                        elmt.m_dataMax = 0;
                        elmt.m_dataMin = 0;
                        elmt.m_dataUnit = 'x';
                        this.m_attributeCount--;
                        break;
                    case 101:
                        elmt.m_swingWeightsArr.slice(0, elmt.m_swingWeightsArr.length);
                        break;
                    case 102:
                        //update attributes
                        var altKeyes = [];
                        var index = 0;
                        for (var e in this.m_model.getElementArr()) {
                            if (this.m_model.getElementArr()[e].getType() === 102) {
                                altKeyes[index] = e;
                            }
                        }
                        var deleteIndex;
                        for (var k in altKeyes) {
                            if (this.m_model.getElementArr()[altKeyes[k]].getID() === elmt.getID()) {
                                deleteIndex = k;
                            }
                        }
                        for (var e in this.m_model.getElementArr()) {
                            var tm = this.m_model.getElementArr()[e].getType();
                            if (this.m_model.getElementArr()[e].getType() === 100) {
                                this.m_model.getElementArr()[e].deleteValueAtIndex(deleteIndex);
                            }
                        }
                        this.m_alternativCount--;
                        break;
                    case 103:
                        this.m_hasGoal = false;
                        break;
                    default:
                }
                var tm88 = $("#MCAelmtType").val();
                switch ($("#MCAelmtType").val()) {
                    case "100":
                        elmt.setName("Attribute " + this.m_idCounter);
                        //preserve  output connections
                        //dlete input connections
                        for (var i = 0; i < elmt.getConnections().length; i++) {
                            if (elmt.getConnections()[i].getOutputElement() === elmt) {
                                var tmp = elmt.getConnections()[i].getOutputElement();
                                var tmp2 = elmt.getConnections()[i];
                                this.m_mcaContainer.removeChild(elmt.getConnections()[i].m_easelElmt);
                                this.m_model.deleteConnection(elmt.getConnections()[i].getOutputElement().getID());
                            }
                            else {
                                var tmp3 = elmt.getConnections()[i];
                            }
                        }
                        //define data based on alternative elements
                        var altKeyes = [];
                        var index = 0;
                        for (var e in this.m_model.getElementArr()) {
                            if (this.m_model.getElementArr()[e].getType() === 102) {
                                altKeyes[index++] = e;
                            }
                        }
                        var vf = new DST.PiecewiseLinear(0, 0, 1, 1, 0, 1);
                        elmt.setPwlVF(vf);
                        elmt.setDataMin(0);
                        elmt.setDataMax(100);
                        elmt.setDataBaseLine(50);
                        elmt.m_dataUnit = "Unit";
                        var vf = new DST.PiecewiseLinear(elmt.getDataMin(), 0, elmt.getDataMax(), 1, 0, 1);
                        elmt.setPwlVF(vf);
                        for (var j in altKeyes) {
                            elmt.pushValueToDataArr(50);
                        }
                        elmt.setType(100);
                        elmt.setMethod(2);
                        elmt.m_valueFunctionX = 50;
                        elmt.m_valueFunctionY = 50;
                        elmt.m_valueFunctionFlip = 0;
                        this.m_attributeCount++;
                        this.m_attributeIndex = [];
                        this.updateAtributeIndex();
                        break;
                    case "101":
                        elmt.setName("Objective " + this.m_idCounter);
                        for (var i = 0; i < elmt.getConnections().length; i++) {
                        }
                        elmt.setType(101);
                        elmt.setMethod(1);
                        this.updateAtributeIndex();
                        break;
                    case "102":
                        elmt.setName("Alternative " + this.m_idCounter);
                        this.deleteConnectionsFromElement(elmt);
                        elmt.setType(102);
                        elmt.setMethod(0);
                        for (var j in this.m_model.getElementArr()) {
                            if (this.m_model.getElementArr()[j].getType() === 100) {
                                this.m_model.getElementArr()[j].pushValueToDataArr((this.m_model.getElementArr()[j].getDataMax() - this.m_model.getElementArr()[j].getDataMin()) / 2);
                                this.m_model.getElementArr()[j].setDataBaseLine((this.m_model.getElementArr()[j].getDataMax() - this.m_model.getElementArr()[j].getDataMin()) / 2);
                            }
                        }
                        this.m_alternativCount++;
                        this.updateAtributeIndex();
                        this.m_model.updateAltIndex();
                        this.m_readyForSA = this.isReadyForSA();
                        if (this.m_readyForSA) {
                            this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                            this.updateSATableData();
                            this.updateChartData(this.m_SAChosenElement);
                            this.updateSA();
                        }
                        break;
                    case "103":
                        elmt.setName("Goal " + this.m_idCounter);
                        if (!this.m_hasGoal) {
                            elmt.setType(103);
                            this.deleteConnectionsFromElement(elmt);
                            this.m_hasGoal = true;
                            this.m_model.setMainObj(elmt);
                            this.m_finalScoreChosenObjective = elmt;
                            elmt.setMethod(1);
                        }
                        this.updateAtributeIndex();
                        break;
                    default: //console.log("Element is suppoesd to  be deleted"); 
                }
                this.populateElmtDetails(elmt);
                this.updateElement(elmt);
                this.updateModel();
                this.updateTable(this.m_model.getDataMatrix(true));
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_skipUpdateDropDowns = false;
            };
            GUIHandler.prototype.optionMethodChange = function (p_evt) {
                //var elmt: Element = $("#detailsDialog").data("element");
                var elmt = $("#detailsDialog").data("element");
                //var el: Element = document.getElementById("detailsDialog").data("element"); 
                elmt.setMethod($("#MCAWeightingMethod").val());
                switch ($("#MCAWeightingMethod").val()) {
                    case "1":
                        //elmt.getConnectionArr();
                        if (elmt.m_swingWeightsArr.length == 0) {
                            var dataMatrix = this.m_model.getDataMatrix();
                            for (var i = 0; i < this.m_alternativCount; i++) {
                                elmt.m_swingWeightsArr[i] = [];
                                elmt.m_swingWeightsArr[i][0] = dataMatrix[i + 3][0];
                                elmt.m_swingWeightsArr[i][1] = 50;
                            }
                        }
                        //elmt.setData({});
                        break;
                    case "2":
                        //elmt.setData([Math.random() * 100, Math.random() * 100, 0, 0, 100]);
                        break;
                    case "4":
                        {
                        }
                    default:
                }
                this.m_readyForSA = this.isReadyForSA();
                this.updateTable(this.m_model.getDataMatrix(true));
                if (!this.m_model.m_bbnMode && this.m_readyForSA) {
                    var tmp = this.getCritSelected();
                    this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                    this.updateSADropdown();
                    this.updateFinalScoresDropDowns();
                    this.updateSA();
                }
                this.populateElmtDetails(elmt);
                this.m_updateMCATables = true;
                this.m_updateMCAStage = true;
                this.m_skipUpdateDropDowns = true;
            };
            GUIHandler.prototype.allConnectionstoconsole = function (p_evt) {
                for (var i = 0; i < this.m_model.getConnectionArr().length; i++) {
                }
            };
            //private addDataRowClick(p_evt: Event) {
            //    //console.log("doing tnifgs");
            //    //$("#defTable_div").append("<p> hello </p>");
            //    //var elmt: Element = $("#detailsDialog").data("element");
            //    var elmt: any = $("#detailsDialog").data("element");
            //    var oldData: any[][] = [];
            //    oldData = elmt.getData();
            //    var newData: any[][] = [];
            //    //newData = oldData;
            //    //oldData[0] = elmt.getData(0);
            //    //oldData[1] = elmt.getData(1);
            //    ////console.log("o0" + oldData[0]
            //}
            GUIHandler.prototype.allModeltoconsole = function (p_evt) {
                //console.log("All Model");
                ////console.log("in local storage: " + localStorage.getItem(this.m_handler.getActiveModel().getIdent()));
                for (var i = 0; i < this.m_model.getElementArr().length; i++) {
                    //console.log("Element: " + this.m_model.getElementArr()[i].getID());
                    for (var j = 0; j < this.m_model.getElementArr()[i].getConnections().length; j++) {
                    }
                }
                //for (var i = 0; i < this.m_model.getConnectionArr().length; i++) {
                //    //console.log("Id: " + this.m_model.getConnectionArr()[i].getID + "  InElmt: " + this.m_model.getConnectionArr()[i].getInputElement + "  OutElmt: " + this.m_model.getConnectionArr()[i].getOutputElement);
                //}
            };
            GUIHandler.prototype.cnctStatus = function () {
                if ($("#cnctTool").prop("checked")) {
                }
                else {
                }
                //$("#cnctTool").button('refresh').blur();//
            };
            GUIHandler.prototype.selectModel = function (p_evt) {
                this.m_handler.getFileIO().loadModel($("#selectModel").val(), this.m_model, this.importStage);
            };
            GUIHandler.prototype.loadModel = function (p_evt) {
                //////console.log(this);
                //////console.log(this.m_handler);
                if (this.m_model.m_bbnMode) {
                    this.m_handler.getFileIO().loadfromGenie(this.m_model, this.importStage);
                }
                else {
                    this.m_handler.getFileIO().loadMCAModelFromFile(this.m_model, this.importStage);
                }
                this.updateAtributeIndex();
            };
            GUIHandler.prototype.updateAltData = function () {
                var altCount = 0;
                this.m_altData.length = 0;
                for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (e.getType() === 102) {
                        this.m_altData[altCount++][0] = e.getName();
                    }
                }
                for (var _b = 0, _c = this.m_model.getElementArr(); _b < _c.length; _b++) {
                    var e = _c[_b];
                    if (e.getType() === 100) {
                        for (var i = 1; i < this.m_altData.length + 1; i++) {
                            for (var j = 1; j < e.getDataArr().length + 1; j++) {
                                this.m_altData[i][j];
                            }
                        }
                    }
                }
            };
            GUIHandler.prototype.saveModel = function (p_evt) {
                //var originalName: string = $("#saveFile_div").html();
                var handler = this.m_handler;
                var model = this.m_model;
                $("#saveFile_div").show();
                var saveName;
                var fileAttr = $("#filename").attr('value');
                if (fileAttr === undefined)
                    saveName = "model" + ".xdsl";
                else
                    saveName = fileAttr + ".xdsl";
                //console.log("saveNmae: " + saveName);
                this.m_handler.getFileIO().saveModel(this.m_model, saveName);
            };
            GUIHandler.prototype.selectAll = function (p_evt) {
                this.clearSelection();
                for (var i = 0; i < this.m_model.getElementArr().length; i++) {
                    this.addToSelection(this.m_model.getElementArr()[i].m_easelElmt);
                }
            };
            GUIHandler.prototype.updateModel = function () {
                if (this.m_model.m_bbnMode == true) {
                    this.m_model.update();
                    this.updateMiniTables(this.m_model.getElementArr());
                }
                else {
                }
            };
            GUIHandler.prototype.setSize = function (p_width, p_height) {
                //console.log("setting size to " + p_width + " , " + p_height);
                this.m_mcaStageCanvas.height = p_height;
                this.m_mcaStageCanvas.width = p_width;
                this.m_mcaBackground.scaleY = p_height / this.m_mcaSizeY;
                this.m_mcaBackground.scaleX = p_width / this.m_mcaSizeX;
            };
            GUIHandler.prototype.increaseSize = function (p_x, p_y) {
                this.m_mcaBackground.scaleY = (this.m_mcaStageCanvas.height + p_y) / this.m_mcaSizeY;
                this.m_mcaBackground.scaleX = (this.m_mcaStageCanvas.width + p_x) / this.m_mcaSizeX;
                this.m_mcaStageCanvas.height += p_y;
                this.m_mcaStageCanvas.width += p_x;
            };
            GUIHandler.prototype.resetDcmt = function () {
                //console.log("in local storage: " + localStorage.getItem(this.m_handler.getActiveModel().getIdent()));
                this.clearSelection();
                if (this.m_handler.getFileIO().reset(this.m_model) === null) {
                    var loadModel = DST.Tools.getUrlParameter('model');
                    loadModel = this.m_model.getIdent();
                    //console.log("using model: " + loadModel);
                    this.m_handler.getFileIO().loadModel(loadModel, this.m_handler.getActiveModel(), this.importStage);
                }
                else {
                    this.m_model.fromJSON(this.m_handler.getFileIO().reset(this.m_model));
                    this.importStage();
                    if (!this.m_model.getElementArr().length) {
                        var loadModel = DST.Tools.getUrlParameter('model');
                        loadModel = "scotland";
                        //console.log("using model: " + loadModel);
                        this.m_handler.getFileIO().loadModel(loadModel, this.m_handler.getActiveModel(), this.importStage);
                    }
                }
            };
            GUIHandler.prototype.importStage = function () {
                this.m_mcaContainer.removeAllChildren();
                ////console.log(this);
                var tmp = this.m_model.getMainObjective();
                this.m_readyForSA = false;
                if (this.m_model.getMainObjective() != undefined) {
                    var tmp2 = this.m_SAChosenElement;
                    this.m_finalScoreChosenObjective = this.m_model.getMainObjective();
                    this.m_model.getMainObjective().setCriteriaLevel(0);
                    this.updateAlternativeCount();
                    this.m_readyForSA = this.isReadyForSA();
                    this.m_SAChosenElement = this.m_model.getMainObjective();
                    this.m_SAChosenSubElement = this.m_SAChosenElement.getParentElements()[0];
                    var tmp4 = this.m_model.getMainObjective().getDataArr();
                    this.m_SASliderValue = 50; //this.m_model.getMainObjective().m_swing
                    this.m_hasGoal = true;
                }
                var elmts = this.m_model.getElementArr();
                var conns = this.m_model.getConnectionArr();
                this.m_attributeCount = 0;
                for (var i = 0; i < elmts.length; i++) {
                    ////console.log("adding to stage:")
                    ////console.log(elmts[i]);
                    if (elmts[i].getType() === 100)
                        this.m_attributeCount++;
                    this.addElementToStage(elmts[i]);
                }
                for (var i = 0; i < conns.length; i++) {
                    this.addConnectionToStage(conns[i]);
                }
                this.m_readyForSA = this.isReadyForSA();
                if (this.m_readyForSA) {
                    $("#SenAna").show();
                    //$("#finalScore_div").show();
                    $("#finalScoreOverview_div").show();
                    $("#finalScoreTab_div").show();
                }
                else {
                    $("#SenAna").hide();
                    //$("#finalScore_div").hide();
                    $("#finalScoreOverview_div").hide();
                    $("#finalScoreTab_div").hide();
                }
                this.updateTable(this.m_model.getDataMatrix(true));
                if (!this.m_model.m_bbnMode && this.m_readyForSA) {
                    this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                    this.updateSADropdown();
                    this.updateFinalScoresDropDowns();
                    this.updateSA();
                }
                else {
                    this.updateMiniTables(elmts);
                }
                if (this.m_attributeCount > 0)
                    $("#MCADataTable").show();
                else
                    $("#MCADataTable").hide();
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_skipUpdateDropDowns = false;
                //this.updateAltData();
                if (this.m_readyForSA) {
                    if (this.m_model.getMainObjective() != undefined && this.m_SAChosenElement != null && this.m_SAChosenSubElement != null)
                        this.updateChartData(this.m_model.getMainObjective());
                    this.updateSATableData();
                    this.updateSA();
                }
                this.m_idCounter = this.m_model.getElementArr().length;
                //this.m_handler.getFileIO().quickSave(this.m_model); //This is commented out the because it was preventing reset from working properly
            };
            ;
            GUIHandler.prototype.mouseUp = function (p_evt) {
                ////console.log("mouse up");
                $("#mX").html("stageX: " + p_evt.stageX + "  localX: " + p_evt.localX + "  rawX: " + p_evt.rawX);
                $("#mY").html("stageY: " + p_evt.stageY + "  localY: " + p_evt.localY + "  rawY: " + p_evt.rawY);
                $("#mAction").html("Action: mouseUp");
                $("#mTarget").html("Target: " + p_evt.target.name);
                //var tmp: any = this.m_mcaContainer.getObjectUnderPoint(p_evt.stageX, p_evt.stageY, 0).name;
                //$("#mTarget").html("Target: " + tmp );
                //this.m_updateMCAStage = true;
                //this.m_updateMCATables = true;
            };
            GUIHandler.prototype.pressUp = function (p_evt) {
                ////console.log("pressup");
                this.updateSize();
            };
            GUIHandler.prototype.mouseMove = function (p_evt) {
                if ($("cnctTool").prop("checked")) {
                }
            };
            GUIHandler.prototype.updateElement = function (p_elmt) {
                p_elmt.m_easelElmt.removeAllChildren();
                var shape = new createjs.Shape();
                ////console.log("element type: " + p_elmt.getType());
                var tmp = p_elmt.getType();
                if (p_elmt.m_dstType === 1) {
                    var t = p_elmt.getType() - 100;
                    shape.graphics.f(this.m_elementColors[p_elmt.getType() - 100][0]).s(this.m_elementColors[p_elmt.getType() - 100][1]);
                }
                else {
                    shape.graphics.f(this.m_elementColors[p_elmt.getType()][0]).s(this.m_elementColors[p_elmt.getType()][1]);
                }
                var elmtShapeType = 2;
                if (this.m_model.m_bbnMode) {
                    elmtShapeType = p_elmt.getType();
                }
                //var shape = new createjs.Shape();
                //shape.graphics.f(this.m_elementColors[elmtShapeType][0]).s(this.m_elementColors[elmtShapeType][1]);
                switch (elmtShapeType) {
                    case 0:
                        //chance
                        shape.graphics.drawEllipse(0, 0, 200, 35);
                        break;
                    case 1:
                        //decision
                        shape.graphics.drawRect(0, 0, 150, 30);
                        break;
                    case 2:
                        //Value
                        shape.graphics.drawRoundRect(0, 0, 175, 35, 10);
                        break;
                    default:
                        break;
                }
                if (p_elmt.m_dstType === 1) {
                    //var label = new createjs.Text(p_elmt.getName().substr(0, 10), "bold 2.5em Helvetica", this.m_elementColors[p_elmt.getType() - 100][3]);
                    var label = new createjs.Text(p_elmt.getName().substr(0, 10), "bold 2.2em Ariel", this.m_elementColors[p_elmt.getType() - 100][3]);
                }
                else {
                    var label = new createjs.Text(p_elmt.getName().substr(0, 24), "1em trebuchet", this.m_elementColors[p_elmt.getType()][3]);
                }
                //var label = new createjs.Text(p_elmt.getName().substr(0, 24), "1em trebuchet", this.m_elementColors[p_elmt.getType()][1]);
                label.textAlign = "center";
                label.textBaseline = "middle";
                label.maxWidth = 145;
                label.x = 75;
                label.y = 15;
                p_elmt.m_easelElmt.addChild(shape);
                p_elmt.m_easelElmt.addChild(label);
                if (this.m_model.m_bbnMode) {
                }
            };
            GUIHandler.prototype.updateMiniTables = function (p_elmtArr) {
                ////console.log("updating minitable");
                if (this.m_model.m_bbnMode) {
                    for (var j = 0; j < p_elmtArr.length; j++) {
                        var elmt = p_elmtArr[j];
                        //  //console.log(elmt.getName() + " minitable is being updated");
                        var backgroundColors = ["#c6c6c6", "#bfbfe0"];
                        var decisionCont = elmt.m_minitableEaselElmt;
                        decisionCont.removeAllChildren();
                        //console.log("elmt.getValues: " + elmt.getValues());
                        if (elmt.getValues()[0].length > 2) {
                            var decisTextBox = new createjs.Text("Values is multidimensional", "0.8em trebuchet", "#303030");
                            decisionCont.addChild(decisTextBox);
                        }
                        else {
                            for (var i = DST.Tools.numOfHeaderRows(elmt.getValues()); i < elmt.getValues().length; i++) {
                                var backgroundColor;
                                if (elmt.getDecision() == i && elmt.getType() == 1) {
                                    backgroundColor = "#CCFFCC";
                                }
                                else {
                                    backgroundColor = backgroundColors[i % 2];
                                }
                                var decisRect = new createjs.Shape(new createjs.Graphics().f(backgroundColor).s("#303030").ss(0.5).r(0, i * 12, 70, 12));
                                //   //console.log("" + elmt.getValues());
                                ////console.log("substring 0-12: " + elmt.getValues()[i][0]);
                                var decisName = new createjs.Text(elmt.getValues()[i][0].substr(0, 12), "0.8em trebuchet", "#303030");
                                decisName.textBaseline = "middle";
                                decisName.maxWidth = 68;
                                decisName.x = 2;
                                decisName.y = 6 + (i * 12);
                                decisionCont.addChild(decisRect);
                                decisionCont.addChild(decisName);
                                var valueData = elmt.getValues()[i][1];
                                if (valueData == -Infinity) {
                                    valueData = 0;
                                }
                                var decisBarBackgr = new createjs.Shape(new createjs.Graphics().f(backgroundColor).s("#303030").ss(0.5).r(70, i * 12, 60, 12));
                                var decisBar = new createjs.Shape(new createjs.Graphics().f(this.m_googleColors[i % this.m_googleColors.length]).r(96, 1 + (i * 12), 35 * valueData, 10));
                                if (elmt.getType() === 0) {
                                    var decisPercVal = new createjs.Text(Math.floor(valueData * 100) + "%", "0.8em trebuchet", "#303030");
                                }
                                else {
                                    decisBar.visible = false;
                                    var decisPercVal = new createjs.Text("" + DST.Tools.round(valueData), "0.8em trebuchet", "#303030");
                                }
                                decisPercVal.textBaseline = "middle";
                                decisPercVal.maxWidth = 22;
                                decisPercVal.x = 71;
                                decisPercVal.y = 6 + (i * 12);
                                decisionCont.addChild(decisBarBackgr);
                                decisionCont.addChild(decisBar);
                                decisionCont.addChild(decisPercVal);
                            }
                        }
                        decisionCont.addEventListener("click", this.clickedDecision);
                        decisionCont.x = elmt.m_easelElmt.x + 75;
                        decisionCont.y = elmt.m_easelElmt.y - 15;
                        decisionCont.name = elmt.getID();
                        elmt.m_minitableEaselElmt = decisionCont;
                        this.m_mcaContainer.addChild(decisionCont);
                        if (elmt.getType() == 2) {
                            decisionCont.visible = false;
                        }
                        this.m_updateMCAStage = true;
                    }
                }
            };
            GUIHandler.prototype.clickedDecision = function (p_evt) {
                if (!this.m_editorMode) {
                    ////console.log("clicked a decision");
                    ////console.log(p_evt);
                    this.m_model.setDecision(p_evt.currentTarget.name, Math.floor(p_evt.localY / 12));
                    this.updateModel();
                }
            };
            GUIHandler.prototype.updateEditorMode = function () {
                ////console.log("updating editormode");
                if (this.m_editorMode) {
                    $(".advButton").show();
                    //$("#reset").show();
                    if (this.m_model.m_bbnMode) {
                        $("#lodDcmtDiv").css("display", "inline-block"); //cannot use show here, because in firefox it adds the attribute "block" and the button is not inline
                        $("#newElmt").hide();
                        $("#newDcmt").hide();
                    }
                    else {
                        $("#newChance").hide();
                        $("#newDec").hide();
                        $("#newValue").hide();
                        $("#newDcmt").hide();
                        $("#lodDcmtDiv").show();
                        $("#elementType").show();
                    }
                }
                else {
                    $(".advButton").hide();
                    //$("#lodDcmtDiv").hide();
                    $("#cnctTool").prop("checked", false);
                }
                var elementArr = this.m_model.getElementArr();
                if (elementArr) {
                    for (var i = 0; i < elementArr.length; i++) {
                        if (this.m_editorMode) {
                            elementArr[i].m_easelElmt.addEventListener("pressmove", this.pressMove);
                            elementArr[i].m_easelElmt.addEventListener("pressup", this.pressUp);
                            this.m_model.setDecision(elementArr[i].getID(), elementArr[i].getDecision()); //Unsets all decisions
                        }
                        else {
                            elementArr[i].m_easelElmt.removeEventListener("pressmove", this.pressMove);
                            elementArr[i].m_easelElmt.removeEventListener("pressup", this.pressUp);
                        }
                    }
                    this.updateModel();
                }
                this.updateTable(this.m_model.getDataMatrix(true));
            };
            GUIHandler.prototype.initEditorMode = function (p_on) {
                if (p_on === true) {
                    this.m_editorMode = true;
                    $("#editorMode").prop('checked', true);
                }
                else {
                    this.m_editorMode = false;
                    $("#editorMode").prop('checked', false);
                }
                $("#editorMode").button('refresh');
                this.updateEditorMode();
            };
            GUIHandler.prototype.fullscreen = function (p_evt) {
                //console.log("in local storage: " + localStorage.getItem(this.m_handler.getActiveModel().getIdent()));
                var model = this.m_model;
                // this.m_handler.getFileIO().quickSave(model);
                //var modelIdent = model.getIdent();
                //var json: string = JSON.stringify(model);
                //sessionStorage.setItem(model.getIdent(), json);
                //console.log("fullscreen pressed");
                if (!this.m_fullscreen) {
                    ////console.log("was not in fullscreen");
                    $(".row").hide();
                    $(".footer").hide();
                    var modelPos = this.getModelPos();
                    this.setSize(Math.max(modelPos[3], $(window).width()), Math.max(modelPos[1], $(window).height()));
                    this.m_fullscreen = true;
                }
                else {
                    ////console.log("was in fullscreen");
                    $(".row").show();
                    $(".footer").show();
                    this.repositionModel();
                    this.updateSize();
                    this.m_fullscreen = false;
                }
                //json = JSON.parse(sessionStorage.getItem(this.m_handler.getActiveModel().getIdent()));
                //json = JSON.parse(sessionStorage.getItem(modelIdent));
                //model.fromJSON(json);
                // this.importStage(); 
                this.m_updateMCAStage = true;
            };
            //Moves all elements to a reasonable position
            GUIHandler.prototype.repositionModel = function () {
                var modelPos = this.getModelPos();
                var lowestElement = modelPos[0];
                var highestElement = modelPos[1];
                var leftmostElement = modelPos[2];
                var rightmostElement = modelPos[3];
                var moveDistanceX = 0;
                var moveDistanceY = 0;
                if (highestElement > 50) {
                    moveDistanceY = -highestElement + 50;
                }
                if (this.getModelSize()[0] > $(window).width()) {
                    if (leftmostElement > 100) {
                        moveDistanceX = -leftmostElement + 100;
                    }
                }
                else {
                    moveDistanceX = $(window).width() / 2 - (leftmostElement + (rightmostElement - leftmostElement) / 2);
                }
                this.moveAllElements(moveDistanceX, moveDistanceY);
            };
            GUIHandler.prototype.updateSize = function () {
                ////console.log("updating size");
                var gui = this;
                var modelPos = this.getModelPos();
                var lowestElement = modelPos[0];
                var highestElement = modelPos[1];
                var leftmostElement = modelPos[2];
                var rightmostElement = modelPos[3];
                var moveDistanceX = 0;
                var moveDistanceY = 0;
                ////console.log("highest element: " + highestElement);
                ////console.log("lowest element: " + lowestElement);
                ////console.log("rightmost element: " + rightmostElement);
                ////console.log("leftmost element: " + leftmostElement);
                this.m_updateMCAStage = true;
                //this.setSize(Math.max($(window).width(), rightmostElement), lowestElement); //Sets size 
            };
            GUIHandler.prototype.getModelSize = function () {
                var modelPos = this.getModelPos();
                return [modelPos[3] - modelPos[2], modelPos[1] - modelPos[0]];
            };
            //Returns a list containing lowest, highest, leftmost and rightmost element in that order
            GUIHandler.prototype.getModelPos = function () {
                var gui = this;
                var lowestElement = 0;
                var highestElement = $(window).height();
                var leftmostElement = $(window).width();
                var rightmostElement = 0;
                this.m_model.getElementArr().forEach(function (e) {
                    ////console.log("e y = " + (e.m_easelElmt.y + gui.m_mcaContainer.y) + " and lowestElement: " + lowestElement);
                    var tmp1 = e.m_easelElmt.x;
                    var tmp2 = e.m_easelElmt.y;
                    if (e.m_easelElmt.y + gui.m_mcaContainer.y > lowestElement) {
                        lowestElement = gui.m_mcaContainer.y + e.m_easelElmt.y + 30;
                    }
                    if (e.m_easelElmt.y + gui.m_mcaContainer.y < highestElement) {
                        highestElement = e.m_easelElmt.y + gui.m_mcaContainer.y;
                    }
                    if (e.m_easelElmt.x + gui.m_mcaContainer.x < leftmostElement) {
                        leftmostElement = e.m_easelElmt.x + gui.m_mcaContainer.x;
                    }
                    if (e.m_easelElmt.x + gui.m_mcaContainer.x > rightmostElement) {
                        rightmostElement = e.m_easelElmt.x + gui.m_mcaContainer.x + 150;
                    }
                });
                return [lowestElement, highestElement, leftmostElement, rightmostElement];
            };
            GUIHandler.prototype.createNewChance = function (p_evt) {
                var elmt = this.m_model.createNewElement(0);
                this.addElementToStage(elmt);
                elmt.update();
                this.updateMiniTables([elmt]);
            };
            GUIHandler.prototype.createNewDec = function (p_evt) {
                var elmt = this.m_model.createNewElement(1);
                this.addElementToStage(elmt);
                elmt.update();
                this.updateMiniTables([elmt]);
            };
            GUIHandler.prototype.createNewValue = function (p_evt) {
                var elmt = this.m_model.createNewElement(2);
                this.addElementToStage(elmt);
                elmt.update();
                this.updateMiniTables([elmt]);
            };
            GUIHandler.prototype.createNewElement = function (p_evt) {
                var elmt = this.m_model.createNewElement(undefined);
                elmt.setName("Objective " + ++this.m_idCounter);
                //console.log("**New Element id: " + elmt.getID() + "   Name: " + elmt.getName());
                this.addElementToStage(elmt);
                if (this.m_model.getElementArr().length === 1) {
                    this.m_SAChosenElement = elmt;
                    this.updateSA();
                }
                // elmt.update();
                //this.updateMiniTables([elmt]);
                //this.importStage();
                this.m_skipUpdateDropDowns = false;
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
            };
            GUIHandler.prototype.deleteSelected = function (p_evt) {
                for (var i = 0; i < this.m_selectedItems.length; i++) {
                    var elmt = this.m_model.getElement(this.m_selectedItems[i].name);
                    if (elmt.getType() === 100)
                        this.m_attributeCount--;
                    else if (elmt.getType() === 102)
                        this.m_alternativCount--;
                    if (this.addToTrash(elmt)) {
                        while (elmt.getConnections().length) {
                            this.m_mcaContainer.removeChild(elmt.getConnections()[0].m_easelElmt);
                            this.m_model.deleteConnection(elmt.getConnections()[0].getID());
                        }
                    }
                }
                this.clearSelection();
                for (var i = 0; i < this.m_trashBin.length; i++) {
                    if (this.m_trashBin[i].getType() === 103)
                        this.m_hasGoal = false;
                    this.m_mcaContainer.removeChild(this.m_model.getElement(this.m_trashBin[i].getID()).m_easelElmt);
                    this.m_model.deleteElement(this.m_trashBin[i].getID());
                }
                this.m_trashBin = []; // empty trashbin
                //this.updateTable(this.m_model.getDataMatrix(true));
                this.m_skipUpdateDropDowns = false;
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
            };
            GUIHandler.prototype.addToTrash = function (p_obj) {
                //////console.log(this.m_trashBin.indexOf(p_obj));
                if (this.m_trashBin.indexOf(p_obj) === -1) {
                    this.m_trashBin.push(p_obj);
                    return true;
                }
                else {
                    return false;
                }
            };
            GUIHandler.prototype.addElementToStage = function (p_elmt) {
                this.updateElement(p_elmt);
                p_elmt.m_easelElmt.regX = 75;
                p_elmt.m_easelElmt.regY = 15;
                if (p_elmt.m_easelElmt.x <= 0 && p_elmt.m_easelElmt.y <= 0) {
                    p_elmt.m_easelElmt.x = 225;
                    p_elmt.m_easelElmt.y = 125;
                }
                if (this.m_editorMode) {
                    p_elmt.m_easelElmt.addEventListener("pressmove", this.pressMove);
                    p_elmt.m_easelElmt.addEventListener("pressup", this.pressUp);
                }
                p_elmt.m_easelElmt.addEventListener("mousedown", this.mouseDown);
                p_elmt.m_easelElmt.on("dblclick", this.dblClick);
                p_elmt.m_easelElmt.mouseChildren = false;
                p_elmt.m_easelElmt.name = p_elmt.getID();
                this.m_mcaContainer.addChild(p_elmt.m_easelElmt);
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_skipUpdateDropDowns = false;
            };
            GUIHandler.prototype.dblClick = function (p_evt) {
                //////console.log(this);
                if (p_evt.target.name.substr(0, 4) === "elmt") {
                    this.populateElmtDetails(this.m_model.getElement(p_evt.target.name));
                    $("#submit").hide();
                    $("#detailsDialog").dialog("open");
                }
            };
            GUIHandler.prototype.eraseElmtDetails = function (p_elmt) {
                $(".dialogDiv ").hide();
            };
            GUIHandler.prototype.populateElmtDetails = function (p_elmt) {
                //console.log("opening: " + p_elmt.getID());
                this.m_altId = p_elmt.getID();
                this.m_unsavedChanges = false;
                this.eraseElmtDetails(p_elmt);
                var type = p_elmt.getType();
                var method = p_elmt.getMethod();
                //$("#MCAelmtType").prop( 
                $('#MCAelmtType option:contains(' + p_elmt.getTypeName() + ')').prop({ selected: true });
                $('#MCAWeightingMethod option:contains(' + p_elmt.getMethodName() + ')').prop({ selected: true });
                //$('#sel option:contains(' + val + ')').prop({ selected: true });
                ////console.log("unsaved changes: " + this.m_unsavedChanges);
                ////console.log(p_elmt.getName() + " is updated: " + p_elmt.isUpdated());
                ////console.log(p_elmt)
                //set dialog title
                $("#detailsDialog").dialog({
                    title: p_elmt.getName()
                });
                document.getElementById("info_name").innerHTML = p_elmt.getName();
                this.addEditFunction(p_elmt, this.m_editorMode);
                if (this.m_model.m_bbnMode) {
                    //bbn mode only
                    $("#elementType").hide();
                    ////console.log("hiding selector");
                    $("#detailsDialog").data("element", p_elmt);
                    $("#detailsDialog").data("model", this.m_model);
                    var s = DST.Tools.htmlTableFromArray("Definition", p_elmt.getDataOld(), this.m_model, this.m_editorMode);
                    //console.log(p_elmt.getDataOld());
                    $("#defTable_div").html(s);
                    $("#defTable_div").show();
                    var typeText;
                    if (p_elmt.getType() === 0) {
                        typeText = "Chance";
                    }
                    else if (p_elmt.getType() === 1) {
                        typeText = "Decision";
                    }
                    else if (p_elmt.getType() === 2) {
                        typeText = "Value";
                    }
                    document.getElementById("info_name").innerHTML = p_elmt.getName();
                    document.getElementById("info_type").innerHTML = typeText;
                    this.addEditFunction(p_elmt, this.m_editorMode);
                    if (this.m_showDescription) {
                        //set description
                        var description = p_elmt.getDescription();
                        if (description.length < 1) {
                            description = "empty";
                        }
                        document.getElementById("description_div").innerHTML = p_elmt.getDescription();
                        $("#description_div").show();
                    }
                    //set user description
                    if (p_elmt.getUserDescription().length < 1) {
                        document.getElementById("userDescription_div").innerHTML = "write your own description or comments here";
                    }
                    else {
                        document.getElementById("userDescription_div").innerHTML = p_elmt.getUserDescription();
                    }
                    $("#userDescription_div").show();
                    if (p_elmt.isUpdated()) {
                        $("#values").prop('disabled', false);
                    }
                    else {
                        $("#values").prop('disabled', true);
                    }
                }
                else {
                    //MCA mode only
                    if (this.m_editorMode) {
                        $(".info_div").show();
                        $("#weightingMethodSelector").show();
                        $("#elementType").show();
                    }
                    $("#info_type").hide();
                    $("#info_type_tag").hide();
                    $("#detailsDialog").data("element", p_elmt);
                    $("#DisregardAlternative").hide();
                    ////console.log(tableMat);
                    var chartOptions = {
                        width: 700,
                        height: 400,
                        vAxis: { minValue: 0 },
                        legend: { position: 'none', maxLines: 3 },
                        bar: { groupWidth: '60%' },
                        allowHtml: true
                    };
                    switch (p_elmt.getType()) {
                        case 102:
                            //show: tabledata,description
                            $("#weightingMethodSelector").hide();
                            if (p_elmt.m_disregard) {
                                $("#disAlt_check").prop('checked', true).checkboxradio("refresh");
                            }
                            else
                                $("#disAlt_check").prop('checked', false).checkboxradio("refresh");
                            $("#DisregardAlternative").show();
                            $("#description_div").show();
                            break;
                        case 100:
                            //show: valueFn,direct(sliders),ahp
                            $("#weightingMethodSelector").show();
                            $("#datatable_div").show();
                            $("#chart_div").show();
                            // Create the data table.
                            // Instantiate and draw our chart, passing in some options.
                            var chartData = google.visualization.arrayToDataTable(this.m_model.getWeightedData(p_elmt, true));
                            var chart = new google.visualization.ColumnChart($("#chart_div").get(0));
                            chart.draw(chartData, chartOptions);
                            break;
                        case 103: //Goal
                        case 101:
                            //show: swing(sliders),direct(sliders),ahp
                            break;
                    }
                    var tmp3 = p_elmt.getMethod().toString();
                    switch (p_elmt.getMethod().toString()) {
                        case '0':
                            ////console.log("WeigthMethodDirect");
                            ////console.log("Weigthed data: " + this.m_model.getWeightedData(p_elmt, false));
                            break;
                        case '1':
                            ////console.log("WeigthMethodSwing");
                            var sliderHtml = "";
                            $("#sliders_div").empty();
                            // for (var i = 0; i < p_elmt.getDataArr.length; i++) {
                            for (var i = 0; i < p_elmt.m_swingWeightsArr.length; i++) {
                                if (p_elmt.m_swingWeightsArr.length != 1) {
                                    var tmp4 = this.m_altData;
                                    var tmp5 = this.m_attributeIndex;
                                    var tmp6 = this.m_model.getDataMatrix();
                                    var childEl;
                                    if (p_elmt.getType() !== 100) {
                                        childEl = this.m_model.getConnection(p_elmt.m_swingWeightsArr[i][0]).getInputElement();
                                    }
                                    else {
                                        childEl = this.m_model.getElement(p_elmt.m_swingWeightsArr[i][0]);
                                    }
                                    //var childEl = this.m_model.getElement(this.m_model.getDataMatrix()[i + 3][0]);
                                    sliderHtml = "<div><p>" + childEl.getName() + ":<input id=\"inp_" + childEl.getID() + "\"type=\"number\" min=\"0\" max=\"100\"></p><div style=\"margin-top:5px ;margin-bottom:10px\"class =\"slider\"id=\"slid_" + childEl.getID() + "\"></div></div>";
                                    $("#sliders_div").append(sliderHtml);
                                    function makeSlider(count, id, _this1) {
                                        $("#slid_" + id).slider({
                                            min: 0,
                                            max: 100,
                                            value: p_elmt.m_swingWeightsArr[count][1],
                                        });
                                        //$("#inp_" + id).val(p_elmt.getDataArr(1, count));
                                        $("#inp_" + id).val(p_elmt.m_swingWeightsArr[count][1]);
                                        $("#inp_" + id).on("input", function () {
                                            var val = parseInt(this.value);
                                            if (val <= 100 && val >= 0) {
                                                //p_elmt.setData(val, 1, count);
                                                p_elmt.m_swingWeightsArr[count][1] = val;
                                                $("#slid_" + id).slider("option", "value", val);
                                                _this1.updateFinalScores(_this1.m_finalScoreChosenObjective, _this1.getCritSelected());
                                            }
                                            else if (val > 100) {
                                                val = 100;
                                            }
                                            else {
                                                val = 0;
                                            }
                                            //////console.log(p_elmt.getData(1));
                                        });
                                        $("#slid_" + id).on("slide", { id: id, slideNumber: count }, function (event, ui) {
                                            var tmp1 = event.data;
                                            var tmp2 = "elementID: " + p_elmt.getID();
                                            var tmp2b = "element name: " + p_elmt.getName();
                                            var tmp3 = _this1.m_SAChosenElement;
                                            var tmp4 = _this1.m_SAChosenSubElement;
                                            var slideTotal = 0;
                                            var slideSubTotal = 0;
                                            p_elmt.m_swingWeightsArr[count][1] = ui.value;
                                            ////console.log("slideTotal: " + slideTotal);
                                            for (var k = 0; k < p_elmt.m_swingWeightsArr.length; k++) {
                                                slideTotal += p_elmt.m_swingWeightsArr[k][1];
                                            }
                                            if (slideTotal === 0) {
                                                p_elmt.m_swingWeightsArr[count][1] = 1;
                                                ui.value = 1;
                                            }
                                            var tmp11 = slideTotal - ui.value;
                                            if ((slideTotal - ui.value) === 0)
                                                this.m_lineOptions.hAxis.minValue = 1;
                                            ////console.log("Slide: " + ui.value);
                                            $("#inp_" + id).val(ui.value);
                                            //if (id === _this1.m_SAChosenSubElement.getID() && p_elmt.getID() === _this1.m_SAChosenElement.getID()) {
                                            if (p_elmt.getID() === _this1.m_SAChosenElement.getID()) {
                                                if (id === _this1.m_SAChosenSubElement.getID()) {
                                                    //$("#sliderControl_div").slider("option", "value", ui.value);
                                                    _this1.setSliderValue();
                                                    _this1.handleSlide(event, ui);
                                                }
                                                else {
                                                    _this1.updateChartData(p_elmt);
                                                    _this1.updateSATableData();
                                                    _this1.updateSA();
                                                }
                                            }
                                            //_this1.updateSATableData();
                                            //_this1.updateSA();
                                            this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                                        }.bind(_this1));
                                    } // end makeSlider
                                    makeSlider(i, childEl.getID(), this);
                                }
                            }
                            $("#sliders_div").show();
                            if (p_elmt.getType() == 100)
                                this.updateDataTableDiv(p_elmt);
                            break;
                        case '2':
                            //$("#valueFn_div").show();
                            $("#pwl_div").show();
                            ////console.log("WeigthMethodValueFn");
                            this.m_pwWidget.setPwl(p_elmt.getPwlVF());
                            this.m_pwWidget.setUnit(p_elmt.m_dataUnit);
                            this.m_pwWidget.setFlipHorizontal(p_elmt.getFlipHorizontal());
                            this.m_pwWidget.setFlipVertical(p_elmt.getFlipVertical());
                            this.m_pwWidget.setCurrentElement(p_elmt);
                            var tableMat = this.m_model.getWeightedData(p_elmt, false);
                            ////console.log("getWeigthedData: " + tableMat);
                            //var cPX: number = p_elmt.getData(1);
                            var cPX = p_elmt.m_valueFunctionX;
                            //var cPY: number = p_elmt.getData(2);
                            var cPY = p_elmt.m_valueFunctionY;
                            //////console.log("draw line");
                            this.m_valueFnLineCont.removeAllChildren();
                            this.m_controlP.regX = 3;
                            this.m_controlP.regY = 3;
                            this.m_controlP.x = cPX;
                            this.m_controlP.y = cPY;
                            this.m_valFnBackground.name = p_elmt.getID();
                            $("#valueFn_Flip").data("name", p_elmt.getID());
                            $("#valueFn_Linear").data("name", p_elmt.getID());
                            var maxVal = 0;
                            for (var i = 1; i < tableMat.length; i++) {
                                if (tableMat[i][1] > maxVal)
                                    maxVal = tableMat[i][1];
                            }
                            //set minimum and maximum values
                            //var maxVal: number = p_elmt.getData(5);
                            //var minVal: number = p_elmt.getData(4);
                            var maxVal = p_elmt.getDataMax();
                            var minVal = p_elmt.getDataMin();
                            //check if data is within min-max values, and expand as necessary
                            for (var i = 1; i < tableMat.length - 1; i++) {
                                if (tableMat[i][1] > maxVal) {
                                    maxVal = tableMat[i][1];
                                }
                            }
                            for (var i = 1; i < tableMat.length - 1; i++) {
                                if (tableMat[i][1] < minVal) {
                                    minVal = tableMat[i][1];
                                }
                            }
                            for (var i = 0; i < p_elmt.getDataArrLength(); i++) {
                                //for (var i = 1; i < tableMat.length; i++) {
                                //////console.log(tableMat[i][1]);
                                //var vertLine = new createjs.Shape(this.getValueFnLine((tableMat[i][1] - minVal) / (maxVal - minVal) * this.m_valueFnSize, this.m_googleColors[i - 1]));
                                var tmp = (p_elmt.getDataArrAtIndex(i) - minVal) / (maxVal - minVal) * this.m_valueFnSize;
                                var tmp2 = this.m_valueFnSize;
                                var vertLine = new createjs.Shape(this.getValueFnLine((p_elmt.getDataArrAtIndex(i) - minVal) / (maxVal - minVal) * this.m_valueFnSize, this.m_googleColors[i]));
                                //var vertLine = new createjs.Shape(this.getValueFnLine(30, this.m_googleColors[i - 1]));
                                this.m_valueFnLineCont.addChild(vertLine);
                            }
                            //this.updateValFnCP(cPX, cPY, p_elmt.getData(3));
                            this.updateValFnCP(cPX, cPY, p_elmt.m_valueFunctionFlip);
                            //this.m_pwWidget.addPWLToStage();
                            //this.m_pwWidget.update();
                            this.updateDataTableDiv(p_elmt);
                            this.m_pwWidget.addPWLToStage();
                            this.m_pwWidget.update();
                            break;
                        case '3': //ahp
                        case '4': {
                            $("#pwl_div").show();
                            this.m_pwWidget.addPWLToStage();
                            this.m_pwWidget.update();
                            this.updateDataTableDiv(p_elmt);
                            break;
                        }
                    }
                    this.m_updateMCAStage = true;
                    //this.m_updateMCATables = true;
                    this.m_skipUpdateDropDowns = true;
                    //set editor description
                    document.getElementById("description_div").innerHTML = p_elmt.getDescription();
                }
            };
            ;
            GUIHandler.prototype.addEditFunction = function (p_elmt, p_editorMode) {
                var originalName = p_elmt.getName();
                var mareframeGUI = this;
                var model = this.m_model;
                if (this.m_model.m_bbnMode) {
                    var originalDesc = p_elmt.getDescription();
                    var originalUserComments = p_elmt.getUserDescription();
                    //console.log("Element: " + p_elmt.getName() + "ready for editing");
                    // $(function () {
                    $("#userDescription_div").dblclick(function () {
                        $("#submit").show();
                        $(this).addClass("editable");
                        //console.log("original value : " + originalUserComments);
                        $(this).html("<input type='text' value='" + originalUserComments + "' />");
                        $(this).children().first().focus();
                        $(this).children().first().keypress(function (e) {
                            if (e.which == 13) {
                                var newText = $(this).val();
                                //console.log("new text: " + newText);
                                if (newText.length < 1) {
                                    $("#userDescription_div").html(originalUserComments);
                                    newText = originalUserComments;
                                }
                                $(this).parent().text(newText);
                                if (newText !== originalUserComments) {
                                    //console.log("unsaved changes");
                                    mareframeGUI.m_unsavedChanges = true;
                                }
                                originalUserComments = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                            }
                            $(this).parent().removeClass("editable");
                        });
                        $(this).children().first().blur(function () {
                            var newText = $(this).val();
                            //console.log("new text: " + newText);
                            if (newText.length < 1) {
                                $("#userDescription_div").html(originalUserComments);
                                newText = originalUserComments;
                            }
                            $(this).parent().text(newText);
                            if (newText !== originalUserComments) {
                                mareframeGUI.m_unsavedChanges = true;
                            }
                            originalUserComments = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                            $(this).parent().removeClass("editable");
                        });
                    });
                    // });
                    if (p_editorMode) {
                        if (p_elmt.getType() !== 2) {
                            $("#addDataRow").show();
                            $(".minus").button({
                                icons: { primary: "ui-icon-minus" }
                            });
                            //Add function to minus button
                            $(".minus").click(function () {
                                var row = this.id;
                                mareframeGUI.removeRow(p_elmt, row);
                                //create the html table again
                                var s = DST.Tools.htmlTableFromArray("Definition", p_elmt, model, p_editorMode);
                                $("#defTable_div").html(s);
                                //Add the edit function again
                                mareframeGUI.addEditFunction(p_elmt, p_editorMode);
                            });
                        }
                        else {
                            $("#addDataRow").hide();
                        }
                        $("#info_name").dblclick(function () {
                            $("#submit").show();
                            $(this).addClass("editable");
                            $(this).html("<input type='text' value='" + originalName + "' />");
                            $(this).children().first().focus();
                            $(this).children().first().keypress(function (e) {
                                if (e.which == 13) {
                                    var newText = $(this).val();
                                    //console.log("new text13: " + newText);
                                    if (newText.length < 1) {
                                        $("#info_name").html(originalName);
                                        newText = originalName;
                                    }
                                    $(this).parent().text(newText);
                                    if (newText !== originalName) {
                                        //console.log("unsaved changes");
                                        mareframeGUI.m_unsavedChanges = true;
                                    }
                                    originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                }
                                $(this).parent().removeClass("editable");
                            });
                            $(this).children().first().blur(function () {
                                var newText = $(this).val();
                                //console.log("new textblur: " + newText);
                                if (newText.length < 1) {
                                    $("#info_name").html(originalName);
                                    newText = originalName;
                                }
                                $(this).parent().text(newText);
                                if (newText !== originalName) {
                                    mareframeGUI.m_unsavedChanges = true;
                                }
                                originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                $(this).parent().removeClass("editable");
                                this.updateSADropdown();
                                mareframeGUI.updateTable(mareframeGUI.m_model.getDataMatrix(true));
                                mareframeGUI.updateFinalScores(mareframeGUI.m_finalScoreChosenObjective, mareframeGUI.getCritSelected());
                                mareframeGUI.updateChartData(mareframeGUI.m_SAChosenElement);
                                mareframeGUI.updateSA();
                            });
                        });
                        // $(function () {
                        //console.log("original value: " + originalDesc);
                        $("#description_div").dblclick(function () {
                            $("#submit").show();
                            //var originalValue = $(this).text();
                            $(this).addClass("editable");
                            $(this).html("<input type='text' value='" + originalDesc + "' />"); //Prevents the box from becoming emtpy when clicked
                            $(this).children().first().focus();
                            $(this).children().first().keypress(function (e) {
                                if (e.which == 13) {
                                    var newText = $(this).val();
                                    $(this).parent().text(newText);
                                    if (newText.length < 1) {
                                        $("#description_div").html(originalDesc);
                                        newText = originalDesc;
                                    }
                                    if (newText !== originalDesc) {
                                        mareframeGUI.m_unsavedChanges = true;
                                    }
                                    originalDesc = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                }
                                $(this).parent().removeClass("editable");
                            });
                            $(this).children().first().blur(function () {
                                var newText = $(this).val();
                                //console.log("newtext = " + newText + " length: " + newText.length);
                                //console.log("original text: " + originalDesc);
                                if (newText.length < 1) {
                                    $("#description_div").html(originalDesc);
                                    newText = originalDesc;
                                }
                                $(this).parent().text(newText);
                                if (newText !== originalDesc) {
                                    mareframeGUI.m_unsavedChanges = true;
                                }
                                originalDesc = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                $(this).parent().removeClass("editable");
                            });
                            // });
                        });
                        //Data table
                        var editing = false; //this is used to make sure the text does not disapear when double clicking several times
                        $(function () {
                            $("td").dblclick(function () {
                                //console.log("editing: " + editing);
                                if (!editing) {
                                    editing = true;
                                    $("#submit").show();
                                    var originalValue = $(this).text();
                                    //console.log("original value : " + originalValue);
                                    $(this).addClass("editable");
                                    $(this).html("<input type='text' value='" + originalValue + "' />");
                                    $(this).children().first().focus();
                                    $(this).children().first().keypress(function (e) {
                                        if (e.which == 13) {
                                            var newText = $(this).val();
                                            //console.log("new texttd: " + newText);
                                            if (isNaN(newText) || newText.length < 1) {
                                                //console.log("value is not a number");
                                                // alert("Value must be a number");
                                                //TODO find better solution than alert
                                                $(this).parent().text(originalValue);
                                            }
                                            else {
                                                $(this).parent().text(newText);
                                                if (newText !== originalValue) {
                                                    mareframeGUI.m_unsavedChanges = true;
                                                }
                                            }
                                            $(this).parent().removeClass("editable");
                                            editing = false;
                                        }
                                    });
                                    $(this).children().first().blur(function () {
                                        var newText = $(this).val();
                                        if (isNaN(newText) || newText.length < 1) {
                                            //alert("Value must be a number");
                                            //console.log("orignal value: " + originalValue);
                                            //TODO find better solution than alert
                                            $(this).parent().text(originalValue);
                                        }
                                        else {
                                            $(this).parent().text(newText);
                                            //console.log(" new text: " + newText + " originalValue: " + originalValue);
                                            if (newText !== originalValue) {
                                                mareframeGUI.m_unsavedChanges = true;
                                            }
                                            else {
                                                mareframeGUI.m_unsavedChanges = false;
                                            }
                                        }
                                        $(this).parent().removeClass("editable");
                                        editing = false;
                                    });
                                }
                            });
                            //TODO Prevent user from editing the top rows. That data should come from the child elements
                            $(".editable_cell").dblclick(function () {
                                //console.log("editing: " + editing);
                                if (!editing) {
                                    editing = true;
                                    $("#submit").show();
                                    var originalText = $(this).text();
                                    $(this).addClass("editable");
                                    $(this).html("<input type='text' value='" + originalText + "' />");
                                    $(this).children().first().focus();
                                    $(this).children().first().keypress(function (e) {
                                        if (e.which == 13) {
                                            var newText = $(this).val();
                                            if (newText.length < 1) {
                                                //alert("Cell cannot be empty");
                                                //console.log("cell cannot be emtpy");
                                                $(this).parent().text(originalText);
                                            }
                                            else {
                                                $(this).parent().text(newText);
                                                if (newText !== originalText) {
                                                    mareframeGUI.m_unsavedChanges = true;
                                                }
                                            }
                                            $(this).parent().removeClass("editable");
                                            editing = false;
                                        }
                                    });
                                    $(this).children().first().blur(function () {
                                        var newText = $(this).val();
                                        if (newText.length < 1) {
                                            //alert("Cell cannot be empty");
                                            //console.log("cell cannot be emtpy");
                                            $(this).parent().text(originalText);
                                        }
                                        else {
                                            $(this).parent().text(newText);
                                            if (newText !== originalText) {
                                                mareframeGUI.m_unsavedChanges = true;
                                            }
                                        }
                                        $(this).parent().removeClass("editable");
                                        editing = false;
                                    });
                                }
                            });
                        });
                    }
                }
                else {
                    if (p_editorMode) {
                        $("#saveFile_div").dblclick(function () {
                        });
                        $("#info_name").dblclick(function () {
                            $("#submit").show();
                            $(this).addClass("editable");
                            $(this).html("<input type='text' value='" + originalName + "' />");
                            $(this).children().first().focus();
                            var gui = this;
                            $(this).children().first().keypress(function (e) {
                                if (e.which == 13) {
                                    var newText = $(this).val();
                                    //console.log("new text13edi: " + newText);
                                    if (newText.length < 1) {
                                        $("#info_name").html(originalName);
                                        newText = originalName;
                                    }
                                    $(this).parent().text(newText);
                                    if (newText !== originalName) {
                                        p_elmt.setName(newText);
                                        mareframeGUI.addElementToStage(p_elmt); //repaints the element
                                    }
                                    originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                    mareframeGUI.updateTable(mareframeGUI.m_model.getDataMatrix(true));
                                    if (mareframeGUI.m_readyForSA) {
                                        mareframeGUI.updateSADropdown();
                                        mareframeGUI.updateFinalScoresDropDowns();
                                        mareframeGUI.updateFinalScores(mareframeGUI.m_finalScoreChosenObjective, mareframeGUI.getCritSelected());
                                        if (mareframeGUI.m_SAChosenElement != null && mareframeGUI.m_SAChosenSubElement != null) {
                                            mareframeGUI.updateChartData(mareframeGUI.m_SAChosenElement);
                                            mareframeGUI.updateSA();
                                        }
                                    }
                                }
                                $(this).parent().removeClass("editable");
                            });
                            $(this).children().first().blur(function () {
                                var newText = $(this).val();
                                //console.log("new textbluredi: " + newText);
                                if (newText.length < 1) {
                                    $("#info_name").html(originalName);
                                    newText = originalName;
                                }
                                $(this).parent().text(newText);
                                if (newText !== originalName) {
                                    p_elmt.setName(newText);
                                    mareframeGUI.addElementToStage(p_elmt); //repaints the element
                                }
                                originalName = newText; //This is needed if the user wants to change the text multiple times without saving inbetween
                                $(this).parent().removeClass("editable");
                                mareframeGUI.updateTable(mareframeGUI.m_model.getDataMatrix(true));
                                if (mareframeGUI.m_readyForSA) {
                                    mareframeGUI.updateSADropdown();
                                    mareframeGUI.updateFinalScoresDropDowns();
                                    mareframeGUI.updateFinalScores(mareframeGUI.m_finalScoreChosenObjective, mareframeGUI.getCritSelected());
                                    if (mareframeGUI.m_SAChosenElement != null && mareframeGUI.m_SAChosenSubElement != null) {
                                        mareframeGUI.updateChartData(mareframeGUI.m_SAChosenElement);
                                        mareframeGUI.updateSA();
                                    }
                                }
                            });
                        });
                    }
                }
            };
            GUIHandler.prototype.showValues = function () {
                //var elmt: Element = $("#detailsDialog").data("element");
                var elmt = $("#detailsDialog").data("element");
                //console.log("Data: " + elmt.getData());
                //console.log("Values: " + elmt.getValues());
                //console.log(elmt.getValues());
                //console.log("size of values: " + math.size(elmt.getValues()));
                var mdl = $("#detailsDialog").data("model");
                //$("#valuesTable_div").html(Tools.htmlTableFromArray("Values", elmt.getValues(), $("#detailsDialog").data("model")));
                $("#valuesTable_div").html(DST.Tools.htmlTableFromArray("Values", elmt.getValues(), mdl, this.m_editorMode));
                $("#valuesTable_div").show();
                $("#values").prop("disabled", true);
            };
            GUIHandler.prototype.saveChanges = function () {
                var elmt = $("#detailsDialog").data("element");
                var oldData = elmt.getData();
                var model = this.m_model;
                //Save user description
                var userDescription = $("#userDescription_div").text();
                elmt.setUserDescription(userDescription);
                //Save description
                var description = $("#description_div").text();
                elmt.setDescription(description);
                //Save def table
                var table = $("#defTable_div");
                var newTable = [];
                var newRow = [];
                elmt.setName($("#info_name").text());
                ////console.log(this);
                table.find("tr").each(function () {
                    $(this).find("th,td").each(function () {
                        if ($(this).text().length > 0) {
                            ////console.log("text to be added: " + $(this).text());
                            ////console.log("does it exsist: " + $.inArray($(this).text(), newRow) === -1)
                            var value = $(this).text();
                            //Don't add the same value twice if it is in one of the header cells
                            //(Better solution: check before the text is saved in the cell)
                            if ($.inArray(value, newRow) === -1 || !isNaN(value)) {
                                //Convert to number
                                if (!isNaN(value)) {
                                    value = Number(value);
                                }
                                ////console.log("pushing " + value);
                                newRow.push(value);
                            }
                        }
                    });
                    newTable.push(newRow);
                    newRow = [];
                });
                ////console.log(newTable);
                //Remove header row with the title "Definition"
                newTable.splice(0, 1);
                //Reset the headerrows. (Better solution would be to prevent the user from editing them
                for (var i = 0; i < DST.Tools.numOfHeaderRows(oldData); i++) {
                    for (var j = 0; j < oldData[0].length; j++) {
                        newTable[i][j] = oldData[i][j];
                    }
                    newTable[i][0] = oldData[i][0];
                }
                if (!DST.Tools.columnSumsAreValid(newTable, DST.Tools.numOfHeaderRows(elmt.getData())) && elmt.getType() == 0) {
                    //Should also show which row is unvalid (maybe right after the user has changed the value)
                    alert("The values in each column must add up to 1");
                }
                else {
                    elmt.setData(newTable);
                    elmt.setUpdated(false);
                    elmt.getAllDescendants().forEach(function (e) {
                        e.setUpdated(false);
                    });
                    elmt.getAllDecisionAncestors().forEach(function (e) {
                        e.setUpdated(false);
                    });
                    if (model.getAutoUpdate()) {
                        this.updateModel();
                    }
                }
                this.m_unsavedChanges = false;
                //this.m_updateMCAStage = true;
                //this.m_mcaContainer.removeChild(elmt.m_easelElmt);
                this.addElementToStage(elmt); //repaint the element. This is necessary if the name of the elemnt has been changed
            };
            GUIHandler.prototype.updateValFnCP = function (p_controlPointX, p_controlPointY, p_flipped_numBool) {
                //var functionSegments = 10;
                this.m_valueFnContainer.removeAllChildren();
                var line = new createjs.Graphics().beginStroke("#0f0f0f").mt(0, this.m_valueFnSize - (this.m_valueFnSize * p_flipped_numBool)).bt(p_controlPointX, p_controlPointY, p_controlPointX, p_controlPointY, this.m_valueFnSize, 0 + (this.m_valueFnSize * p_flipped_numBool));
                //for (var i = 1; i <= functionSegments; i++)
                //{
                //	line.lt(i * (valueFnSize / functionSegments), valueFnSize - (valueFnSize * getValueFn(i * (100 / functionSegments), cPX, valueFnSize-cPY)));
                //}
                var plot = new createjs.Shape(line);
                this.m_valueFnContainer.addChild(plot);
                this.m_valueFnStage.update();
                //update = true;
                ///if(  ) 
                //$("#valueFn_div").show();
            };
            GUIHandler.prototype.updateDataTableDiv = function (p_elmt) {
                ////console.log("tableMat: " + tableMat);
                //alert("pause");
                var tableMat = this.m_model.getWeightedData(p_elmt, false);
                tableMat.splice(0, 0, ["Scenario", "Value", "Weight"]);
                var tableData = google.visualization.arrayToDataTable(tableMat);
                var table = new google.visualization.Table(document.getElementById('datatable_div'));
                for (var i = 0; i < tableMat.length - 1; i++) {
                    tableData.setProperty(i, 0, "style", "color:" + this.m_googleColors[i]);
                }
                table.draw(tableData, { 'allowHtml': true, 'alternatingRowStyle': true, 'width': '100%', 'height': '100%' });
                $('.google-visualization-table-table').width("100%");
            };
            GUIHandler.prototype.downValFnCP = function (p_evt) {
                this.m_oldX = p_evt.stageX;
                this.m_oldY = p_evt.stageY;
            };
            GUIHandler.prototype.moveValFnCP = function (p_evt) {
                var elmt = this.m_model.getElement(p_evt.target.name);
                this.m_controlP.x = p_evt.stageX;
                this.m_controlP.y = p_evt.stageY;
                //elmt.getData()[1] = p_evt.stageX;
                //elmt.getData()[2] = p_evt.stageY;
                elmt.m_valueFunctionX = p_evt.stageX;
                elmt.m_valueFunctionY = p_evt.stageY;
                this.updateValFnCP(p_evt.stageX, p_evt.stageY, elmt.m_valueFunctionFlip);
                this.updateDataTableDiv(elmt);
                //update = true;
                if (this.m_readyForSA) {
                    this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                }
            };
            GUIHandler.prototype.linearizeValFn = function () {
                this.moveValFnCP({ stageX: 50, stageY: 50, target: { name: $("#valueFn_Linear").data("name") } });
            };
            GUIHandler.prototype.flipValFn = function () {
                var tm = $("#valueFn_Flip").data("name");
                var tm2 = tm.toString();
                var elmt = this.m_model.getElement(tm2);
                elmt.m_valueFunctionFlip = Math.abs(elmt.m_valueFunctionFlip - 1);
                this.updateValFnCP(elmt.m_valueFunctionX, elmt.m_valueFunctionY, elmt.m_valueFunctionFlip);
                this.updateDataTableDiv(elmt);
                //update = true;
                if (this.m_readyForSA) {
                    this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                }
            };
            GUIHandler.prototype.getValueFnLine = function (p_xValue, p_color) {
                return new createjs.Graphics().beginStroke(p_color).mt(p_xValue, 0).lt(p_xValue, this.m_valueFnSize);
            };
            GUIHandler.prototype.updateFinalScores = function (p_element, p_criteria) {
                //var finalScores = this.m_model.getScore(p_element, 1);
                //var finalScores = this.m_model.getScore(p_element, p_criteria);
                var finalScores = this.m_model.getScore2(p_element, 1, p_criteria - p_element.m_criteriaLevel);
                var t = [];
                t[0] = [];
                t[0][0] = "xx";
                this.m_model.updateAltIndex();
                //this.updateAtributeIndex();
                var ix = 1;
                for (var a in this.m_model.m_altIndex) {
                    var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[a]];
                    if (elmt.m_disregard == false) {
                        t[ix] = [];
                        t[ix][0] = elmt.getName();
                        ix++;
                    }
                }
                //for (var i = 0; i < finalScores[0].length; i++) {
                for (var j = 0; j < finalScores.length; j++) {
                    t[0][j + 1] = finalScores[j][0];
                }
                ix = 1;
                for (var i = 0; i < this.m_model.m_altIndex.length; i++) {
                    //t[i]=[]
                    var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[i]];
                    if (elmt.m_disregard == false) {
                        for (var j = 0; j < finalScores.length; j++) {
                            if (!t[i])
                                debugger;
                            var tmp2i;
                            var tmp3 = finalScores[j][i];
                            t[ix][j + 1] = finalScores[j][i + 1];
                        }
                        ix++;
                    }
                }
                var data = google.visualization.arrayToDataTable(t);
                //data.removeRow(data.getNumberOfRows() - 1);
                //data.removeRow(data.getNumberOfRows() - 1);
                //data.removeRow(0);
                //data.removeRow(0);
                //data.removeRow(4);
                this.m_finalScoreChartOverview.draw(data, this.m_finalScoreChartOptions);
                //this.m_finalScoreChartTab.draw(data, this.m_finalScoreChartOptions);
                this.updateSA();
            };
            GUIHandler.prototype.updateTable = function (p_matrix) {
                this.updateAlternativeCount();
                if (this.m_alternativCount < 1 && this.m_attributeCount < 1) {
                    $("#MCADataTable").hide();
                }
                else {
                    $("#MCADataTable").show();
                    $(".tableEdit").off('dblclick', 'td');
                    var tableHTML = "";
                    var topRow = true;
                    var row = p_matrix[0];
                    var e = this.m_model.getElement(p_matrix[0][0]);
                    tableHTML = tableHTML + "<thead><tr style=\"border:1px solid black;height:32px\">";
                    for (var i = 0; i < row.length; i++) {
                        if (i === 0) {
                            tableHTML += "<th style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + "x" + 0 + "' class='tableEdit' ><b></b></th>";
                        }
                        if (i !== 0) {
                            var tmp123 = p_matrix[0][i];
                            var e = this.m_model.getElement(p_matrix[0][i]);
                            if (e)
                                tableHTML += "<th style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + "x" + 0 + "' class='tableEdit' ><b>" + e.getName() + "</b></th>";
                            else
                                tableHTML += "<th style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + "x" + 0 + "' class='tableEdit' ><b>" + row[i] + "</b></th>";
                        }
                    }
                    tableHTML += "</thead> <tbody>";
                    for (var j = 1; j < p_matrix.length; j++) {
                        var row = p_matrix[j];
                        var e = this.m_model.getElement(p_matrix[j][0]);
                        if (e) {
                            if (!e.m_disregard)
                                tableHTML = tableHTML + "<tr style=\"border:1px solid black;height:32px\">";
                        }
                        else {
                            if (j != 2)
                                tableHTML = tableHTML + "<tr style=\"border:1px solid black;height:32px\">";
                        }
                        for (var i = 0; i < row.length; i++) {
                            //if (topRow) {
                            //    if (i!==0)
                            //        tableHTML = tableHTML + "<td contenteditable=true style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\">" + this.m_model.getElement(row[i]).getName() + "</td>";
                            //}
                            //else {
                            //    tableHTML = tableHTML + "<td contenteditable=true style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\">" + row[i] + "</td>";
                            //}
                            //tableHTML = tableHTML + "<td contenteditable=true style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + j + "' class='tableEdit' >" + row[i] + "</td>";
                            if (i === 0 && j !== 0 && j != 2) {
                                var tmp123 = p_matrix[j][0];
                                var e = this.m_model.getElement(p_matrix[j][0]);
                                if (e) {
                                    if (!e.m_disregard)
                                        tableHTML = tableHTML + "<td style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + "x" + j + "' class='tableEdit' ><b>" + e.getName() + "</b></td>";
                                }
                                else
                                    tableHTML = tableHTML + "<td style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle\" id='dataTable" + i + "x" + j + "' class='tableEdit' ><b>" + row[i] + "</b></td>";
                            }
                            if (i !== 0 && j != 2 && j !== 0) {
                                var tmp123 = p_matrix[j][0];
                                var e = this.m_model.getElement(p_matrix[j][0]);
                                var t = " ;color:black; ";
                                if (this.m_trafficLightsON) {
                                    if (j > 2 && j < p_matrix.length - 2) {
                                        if (row[i] / p_matrix[2][i] > 1.15) {
                                            t = " ;color:red; ";
                                        }
                                        else if (row[i] / p_matrix[2][i] < 0.85) {
                                            var t = " ;color:blue; ";
                                        }
                                        else {
                                            var t = " ;color:lightgrey; ";
                                        }
                                    }
                                }
                                if (e) {
                                    if (!e.m_disregard)
                                        tableHTML = tableHTML + "<td style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle" + t + "\" id='dataTable" + i + "x" + j + "' class='tableEdit' title='" + e.getName() + "," + this.m_model.getElement(p_matrix[0][i]).getName() + "'>" + row[i] + "</td>";
                                }
                                else {
                                    tableHTML = tableHTML + "<td style=\"padding-right:10px;padding-left:5px;text-align:center;vertical-align:middle" + t + "\" id='dataTable" + i + "x" + j + "' class='tableEdit'>" + row[i] + "</td>";
                                }
                            }
                        }
                        tableHTML = tableHTML + "</tr>";
                        topRow = false;
                    }
                    tableHTML += "</tbody>";
                    ////console.log("tableHtML: " + tableHTML);
                    $('#editableDataTable').fixedHeaderTable('destroy');
                    $("#editableDataTable").html(tableHTML);
                    $('#editableDataTable').fixedHeaderTable({
                        fixedColumns: 1
                    });
                    for (var i = 0; i < row.length; i++) {
                        var selector = ".fht-tbody #dataTable" + i + "x0 div";
                        var selector4 = ".fht-tbody";
                        var selector5 = "#dataTable" + i + "x0";
                        var widthBody = $(selector).width();
                        var tmp3 = $(selector);
                        var tmp4 = $(selector4);
                        var tmp6 = $(selector5);
                        var selector2 = ".fht-thead #dataTable" + i + "x0 div";
                        var tmp = $(selector2);
                        $(selector2).width(widthBody);
                        var tmp = $(selector2);
                        var widthHead = $(selector2).width();
                    }
                    //$(".fht-thead th").css("border", "black solid 5px");
                    //$(".fht-thead th").hide();
                    $(".fht-fixed-column > .fht-tbody").css("opacity", 1).css('background-color', 'white');
                    $(".fht-fixed-column > .fht-thead").css("opacity", 1).css('background-color', 'white');
                    var thWidth = $(".fht-thead th").css('width');
                    var tdWidth = $(".fht-tbody th").css('width');
                    if (this.m_editorMode)
                        $("#MCADataTable").on("dblclick", "td", this.editTableData);
                    else
                        $("#MCADataTable").off("dblclick", "td", this.editTableData);
                }
            };
            GUIHandler.prototype.mouseDown = function (p_evt) {
                //$("#mX").html("stageX: " + p_evt.stageX + "  localX: " + p_evt.localX + "  rawX: " + p_evt.rawX);
                //$("#mY").html("Y: " + p_evt.stageY);
                //$("#mAction").html("Action: mousedown");
                //$("#mTarget").html("Target: " + p_evt.target.name);
                if (p_evt.target.name.substr(0, 4) === "elmt") {
                    var elmt = this.m_model.getElement(p_evt.target.name);
                }
                this.m_oldX = p_evt.stageX;
                this.m_oldY = p_evt.stageY;
                this.m_originalPressX = p_evt.stageX;
                this.m_originalPressY = p_evt.stageY;
                if (p_evt.target.name.substr(0, 4) === "elmt") {
                    var cnctChkbox = document.getElementById("cnctTool"); // What the hell no jQuery
                    if (cnctChkbox.checked) {
                        if (this.m_model.m_bbnMode) {
                            if (!this.connectionExist(p_evt)) {
                                this.connectTo(p_evt);
                            }
                            else {
                                this.disconnectFrom(p_evt);
                            }
                        }
                        else {
                            if (!this.connectionExist(p_evt))
                                this.connctToMCAElement(p_evt);
                            cnctChkbox.checked = false;
                            this.cnctStatus();
                        }
                    }
                    else {
                        this.select(p_evt);
                    }
                }
                else {
                    this.clearSelection();
                }
            };
            GUIHandler.prototype.select = function (p_evt) {
                ////////console.log("ctrl key: " + e.nativeEvent.ctrlKey);
                if (!p_evt.nativeEvent.ctrlKey && this.m_selectedItems.indexOf(p_evt.target) === -1) {
                    this.clearSelection();
                }
                ////console.log("adding to selection: " + p_evt.target);
                this.addToSelection(p_evt.target);
            };
            GUIHandler.prototype.pressMove = function (p_evt) {
                var gui = this;
                ////console.log("press move on target " + p_evt.target.name);
                //$("#mX").html("stageX: " + p_evt.stageX + "  localX: " + p_evt.localX + "  rawX: " + p_evt.rawX);
                //$("#mY").html("stageX: " + p_evt.stageY + "  localY: " + p_evt.localY + "  rawY: " + p_evt.rawY);
                //$("#mAction").html("Action: PressMove");
                //$("#mTarget").html("Target: " + p_evt.target.name);
                if (p_evt.target.name === "hitarea") {
                    ////console.log("editorMode: " + this.m_editorMode);
                    if (p_evt.nativeEvent.ctrlKey) {
                        //////console.log("orig: " + this.m_originalPressX + ", " + this.m_originalPressY + ". curr: " + p_evt.stageX + ", " + p_evt.stageY);
                        this.setSelection(this.m_model.getEaselElementsInBox(this.m_originalPressX, this.m_originalPressY, p_evt.stageX, p_evt.stageY));
                        this.m_selectionBox.graphics.clear().s("rgba(0,0,0,0.7)").setStrokeDash([2, 2], createjs.Ticker.getTime()).drawRect(this.m_originalPressX, this.m_originalPressY, p_evt.stageX - this.m_originalPressX, p_evt.stageY - this.m_originalPressY);
                        this.m_mcaContainer.addChild(this.m_selectionBox);
                    }
                    else if (this.m_editorMode) {
                        if (!this.elementOffScreen(p_evt.stageX - this.m_oldX, p_evt.stageY - this.m_oldY)) {
                            this.moveAllElements(p_evt.stageX - gui.m_oldX, p_evt.stageY - gui.m_oldY);
                        }
                    }
                }
                else if (p_evt.target.name.substr(0, 4) === "elmt") {
                    var connectTool = $("#cnctTool").prop("checked");
                    if (connectTool) {
                    }
                    else {
                        //if (!this.elementOffScreen(p_evt.stageX - this.m_oldX, p_evt.stageY - this.m_oldY)) {
                        if (true) {
                            for (var i = 0; i < this.m_selectedItems.length; i++) {
                                var elmt = this.m_selectedItems[i];
                                elmt.x += p_evt.stageX - this.m_oldX;
                                elmt.y += p_evt.stageY - this.m_oldY;
                                for (var j = 0; j < this.m_model.getElement(elmt.name).getConnections().length; j++) {
                                    var c = this.m_model.getElement(elmt.name).getConnections()[j];
                                    this.updateConnection(c);
                                }
                            }
                        }
                    }
                }
                this.m_oldX = p_evt.stageX;
                this.m_oldY = p_evt.stageY;
                // //console.log("this.m_mcaSizeX " + this.m_mcaSizeX);
                this.m_updateMCAStage = true;
            };
            GUIHandler.prototype.moveAllElements = function (xDistance, yDistance) {
                var gui = this;
                this.m_model.getElementArr().forEach(function (e) {
                    ////console.log("moving element from " + e.m_easelElmt.y + " to " + (e.m_easelElmt.y + yDistance));
                    e.m_easelElmt.x += xDistance;
                    e.m_easelElmt.y += yDistance;
                    e.m_minitableEaselElmt.x += xDistance;
                    e.m_minitableEaselElmt.y += yDistance;
                    for (var j = 0; j < e.getConnections().length; j++) {
                        var c = e.getConnections()[j];
                        gui.updateConnection(c);
                    }
                });
            };
            GUIHandler.prototype.resizeWindow = function () {
                var maxX = 0; // Right edge
                var maxY = 0; //Bottom edge
                var x;
                var y;
                var yEdge = 40; //The distance from the position to the bottom edge
                var xEdge = 200; //Distance from the center to the right edge
                var moveDistance = 10; //The distance to move the canvas in each step
                var gui = this;
                this.m_model.getElementArr().forEach(function (e) {
                    x = e.m_easelElmt.x + gui.m_mcaContainer.x;
                    y = e.m_easelElmt.y + gui.m_mcaContainer.y;
                    if (x + xEdge > maxX) {
                        maxX = x + xEdge;
                    }
                    if (y + yEdge > maxY) {
                        maxY = y + yEdge;
                    }
                });
                ////console.log("max x: " + maxX + " canvas widht: " + this.m_mcaStageCanvas.width);
                if (maxX > this.m_mcaStageCanvas.width) {
                    this.increaseSize(moveDistance, 0);
                    window.scrollBy(moveDistance, 0);
                }
                /*else if (maxX < this.m_mcaStageCanvas.width - 100) {
                    this.increaseSize(-moveDistance, 0);
                }*/
                ////console.log("max y: " + maxY + " canvas heigth: " + this.m_mcaStageCanvas.height);
                if (maxY > this.m_mcaStageCanvas.height) {
                    this.increaseSize(0, moveDistance);
                    window.scrollBy(0, moveDistance);
                }
            };
            GUIHandler.prototype.elementOffScreen = function (xMovement, yMovement) {
                var modelPos = this.getModelPos();
                var lowestElement = modelPos[0];
                var highestElement = modelPos[1];
                var leftmostElement = modelPos[2];
                var rightmostElement = modelPos[3];
                ////console.log("highest element: " + highestElement);
                ////console.log("lowest element: " + lowestElement);
                ////console.log("rightmost element: " + rightmostElement);
                ////console.log("leftmost element: " + leftmostElement);
                var tm = highestElement - 30 + yMovement < 0 || leftmostElement - 80 + xMovement < 0 || lowestElement + yMovement - 30 > this.m_mcaStageCanvas.height || rightmostElement - 80 + xMovement > this.m_mcaStageCanvas.width;
                return tm;
            };
            GUIHandler.prototype.tick = function () {
                if (this.m_updateMCAStage) {
                    this.m_updateMCAStage = false;
                    this.m_mcaStage.update();
                    this.m_valueFnStage.update();
                    this.m_selectionBox.graphics.clear();
                }
                if (this.m_updateMCATables) {
                    this.m_readyForSA = this.isReadyForSA();
                    if (this.m_readyForSA) {
                        $("#SenAna").show();
                        $("#finalScoreOverview_div").show();
                        $("#finalScoreTab_div").show();
                    }
                    else {
                        $("#SenAna").hide();
                        $("#finalScoreOverview_div").hide();
                        $("#finalScoreTab_div").hide();
                    }
                    if (this.m_readyForSA) {
                        if (!this.m_skipUpdateDropDowns) {
                            this.updateSADropdown();
                            this.updateFinalScoresDropDowns();
                            this.m_skipUpdateDropDowns = true;
                        }
                        this.updateFinalScores(this.m_finalScoreChosenObjective, this.getCritSelected());
                        this.updateSATableData();
                        this.updateChartData(this.m_SAChosenElement);
                        this.updateSA();
                    }
                    this.updateTable(this.m_model.getDataMatrix(false));
                    this.m_updateMCATables = false;
                }
            };
            GUIHandler.prototype.clear = function () {
                this.m_mcaContainer.removeAllChildren();
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
            };
            GUIHandler.prototype.disconnectFrom = function (p_evt) {
                //this.m_model.deleteConnection( );
            };
            GUIHandler.prototype.connectionExist = function (p_evt) {
                ////console.log("selected: " + this.m_selectedItems);
                for (var i = 0; i < this.m_selectedItems.length; i += 2) {
                    var e = this.m_selectedItems[i];
                    var first = this.m_model.getElement(e.name);
                    ////console.log("element: " + first);
                    first.isChildOf(this.m_model.getElement(p_evt.target.name));
                    first.isParentOf(this.m_model.getElement(p_evt.target.name));
                }
                return false;
            };
            GUIHandler.prototype.connctToMCAElement = function (p_evt) {
                var elmtIdent = p_evt.target.name;
                var connected = false;
                var newConnection;
                ////console.log("selected length: " + this.m_selectedItems.length);
                for (var i = 0; i < this.m_selectedItems.length; i++) {
                    var e = this.m_selectedItems[i];
                    if (e.name.substr(0, 4) === "elmt" && e.name !== elmtIdent) {
                        var outputElmt = this.m_model.getElement(elmtIdent);
                        var inputElmt = this.m_model.getElement(e.name);
                    }
                    //var tmp = inputElmt.getParentElements();
                    //var tmp2 = outputElmt.getParentElements();
                    if (inputElmt.isChildOf(outputElmt)) {
                        var conn = outputElmt.getConnectionFrom(inputElmt);
                        this.m_mcaContainer.removeChild(conn.m_easelElmt);
                        this.m_model.deleteConnection(conn.getID());
                    }
                    else {
                        newConnection = this.m_model.createNewConnection(inputElmt, outputElmt);
                        ////console.log("connection: " + c);
                        if (this.m_model.addConnection(newConnection)) {
                            this.addConnectionToStage(newConnection);
                            connected = true;
                            switch (outputElmt.getType()) {
                                case 101:
                                    outputElmt.m_swingWeightsArr[outputElmt.m_swingWeightsArr.length] = [newConnection.getID(), 1];
                                    break;
                                case 103:
                                    outputElmt.m_swingWeightsArr[outputElmt.m_swingWeightsArr.length] = [newConnection.getID(), 1];
                                    break;
                            }
                        }
                    }
                    $("#cnctTool").prop("checked", false).button('refresh');
                }
                if (!connected) {
                    this.select(p_evt);
                }
                //this.importStage();
                //this.m_mcaStage.update();
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_skipUpdateDropDowns = false;
            };
            GUIHandler.prototype.connectTo = function (p_evt) {
                debugger;
                var elmtIdent = p_evt.target.name;
                var connected = false;
                ////console.log("attempting connection "+elmtIdent);
                ////console.log("selected length: " + this.m_selectedItems.length);
                for (var i = 0; i < this.m_selectedItems.length; i += 2) {
                    var e = this.m_selectedItems[i];
                    if (e.name.substr(0, 4) === "elmt" && e.name !== elmtIdent) {
                        var outputElmt = this.m_model.getElement(elmtIdent);
                        var inputElmt = this.m_model.getElement(e.name);
                        if (inputElmt.isAncestorOf(outputElmt)) {
                            if (inputElmt.isChildOf(outputElmt)) {
                                //alert("Parent");
                                var conn = outputElmt.getConnectionFrom(inputElmt);
                                ////console.log("deleting connection: " + conn.getID() + "  From: " + outputElmt.getName() + "  To: " + inputElmt.getName());
                                //for (var index in outputElmt.getConnections()) {
                                //    //console.log(outputElmt.getName() + "  Before: " + outputElmt.getConnections()[index].getID());
                                //}
                                //for (var index in inputElmt.getConnections()) {
                                //    //console.log(inputElmt.getName() + "  Before: " + inputElmt.getConnections()[index].getID());
                                //}
                                //this.m_model.deleteConnection( inputElmt.getConnectionFrom(outputElmt).getID() );
                                //this.m_model.deleteConnection(conn.getID());
                                //outputElmt.deleteConnection(inputElmt.getConnectionFrom(outputElmt).getID());
                                ////console.log("connection from " + outputElmt.getName() + " to " + inputElmt.getName() + " named " + inputElmt.getConnectionFrom(outputElmt));
                                ////console.log("connection from " + inputElmt.getName() + " to " + outputElmt.getName() + " named " + outputElmt.getConnectionFrom(inputElmt).getID());
                                inputElmt.deleteConnection(outputElmt.getConnectionFrom(inputElmt).getID());
                                outputElmt.deleteConnection(outputElmt.getConnectionFrom(inputElmt).getID());
                                //for (var index in outputElmt.getConnections()) {
                                //    //console.log(outputElmt.getName() + "  After: " + outputElmt.getConnections()[index].getID());
                                //}
                                //for (var index in inputElmt.getConnections()) {
                                //    //console.log(inputElmt.getName() + "  After: " + inputElmt.getConnections()[index].getID());
                                //}
                                inputElmt.setUpdated(false);
                                inputElmt.getAllDescendants().forEach(function (e) {
                                    e.setUpdated(false);
                                });
                                //this.m_mcaContainer.removeChild(conn);
                                //outputElmt.setUpdated(false);
                                //outputElmt.getAllDescendants().forEach(function (e) {
                                //    e.setUpdated(false);
                                //    this.clear();
                                //});
                                //alert("updating");
                                this.m_model.update();
                                //this.importStage();
                                this.m_mcaStage.update();
                            }
                            else {
                                alert("cannot create a cycle");
                            }
                        }
                        else if (inputElmt.getType() === 2 && outputElmt.getType() !== 3) {
                            alert("Value nodes cannot have children");
                        }
                        else if (inputElmt.getType() === 0 && outputElmt.getType() === 1) {
                            alert("Chance nodes can not have decsion node children");
                        }
                        else {
                            var c = this.m_model.createNewConnection(inputElmt, outputElmt);
                            ////console.log("connection: " + c);
                            if (this.m_model.addConnection(c)) {
                                this.addConnectionToStage(c);
                                connected = true;
                            }
                            if (this.m_model.m_bbnMode) {
                                if (outputElmt.getType() !== 1) {
                                    outputElmt.updateData();
                                }
                                outputElmt.setUpdated(false);
                                outputElmt.getAllDescendants().forEach(function (e) {
                                    e.setUpdated(false);
                                });
                                inputElmt.setUpdated(false);
                            }
                        }
                    }
                }
                if (!connected) {
                    this.select(p_evt);
                }
                //this.m_mcaStage.update();
                //alert("connection is done");
                //this.select(elmtIdent);
            };
            GUIHandler.prototype.addConnectionToStage = function (p_connection) {
                var line = new createjs.Graphics().beginStroke(p_connection.getColor()).mt(p_connection.getInputElement().m_easelElmt.x, p_connection.getInputElement().m_easelElmt.y).lt(p_connection.getOutputElement().m_easelElmt.x, p_connection.getOutputElement().m_easelElmt.y);
                var conn = new createjs.Shape(line);
                var arrow = new createjs.Graphics().beginFill(p_connection.getColor()).mt(-5, 0).lt(5, 5).lt(5, -5).cp();
                var arrowCont = new createjs.Shape(arrow);
                var cont = new createjs.Container();
                arrowCont.x = ((p_connection.getInputElement().m_easelElmt.x - p_connection.getOutputElement().m_easelElmt.x) / 2) + p_connection.getOutputElement().m_easelElmt.x;
                arrowCont.y = ((p_connection.getInputElement().m_easelElmt.y - p_connection.getOutputElement().m_easelElmt.y) / 2) + p_connection.getOutputElement().m_easelElmt.y;
                arrowCont.rotation = (180 / Math.PI) * Math.atan((p_connection.getInputElement().m_easelElmt.y - p_connection.getOutputElement().m_easelElmt.y) / (p_connection.getInputElement().m_easelElmt.x - p_connection.getOutputElement().m_easelElmt.x));
                if (p_connection.getInputElement().m_easelElmt.x < p_connection.getOutputElement().m_easelElmt.x) {
                    arrowCont.rotation = 180 + arrowCont.rotation;
                }
                //cont.hitArea = new createjs.Container()
                //cont.hitArea.add    new createjs.Graphics().setStrokeStyle(10).beginStroke("#0f0f0f").mt(c.getInputElement().easelElmt.x, c.getInputElement().easelElmt.y).lt(c.getOutputElement().easelElmt.x, c.getOutputElement().easelElmt.y);
                cont.name = p_connection.getID();
                //conn.addEventListener("pressmove", pressMove);
                //cont.addEventListener("mousedown", mouseDown);
                //if (this.m_model.m_bbnMode)
                cont.addChild(arrowCont);
                cont.addChild(conn);
                this.m_mcaContainer.addChildAt(cont, 0);
                p_connection.m_easelElmt = cont;
                this.m_updateMCAStage = true;
                this.m_updateMCATables = true;
                this.m_skipUpdateDropDowns = false;
            };
            GUIHandler.prototype.updateConnection = function (p_connection) {
                //stage.removeChild(c.easelElmt);
                // if (this.m_model.m_bbnMode) {
                var temp = p_connection.m_easelElmt.getChildAt(1);
                temp.graphics.clear().beginStroke(p_connection.getColor()).mt(p_connection.getInputElement().m_easelElmt.x, p_connection.getInputElement().m_easelElmt.y).lt(p_connection.getOutputElement().m_easelElmt.x, p_connection.getOutputElement().m_easelElmt.y);
                //}
                p_connection.m_easelElmt.getChildAt(0).x = ((p_connection.getInputElement().m_easelElmt.x - p_connection.getOutputElement().m_easelElmt.x) / 2) + p_connection.getOutputElement().m_easelElmt.x;
                p_connection.m_easelElmt.getChildAt(0).y = ((p_connection.getInputElement().m_easelElmt.y - p_connection.getOutputElement().m_easelElmt.y) / 2) + p_connection.getOutputElement().m_easelElmt.y;
                p_connection.m_easelElmt.getChildAt(0).rotation = (180 / Math.PI) * Math.atan((p_connection.getInputElement().m_easelElmt.y - p_connection.getOutputElement().m_easelElmt.y) / (p_connection.getInputElement().m_easelElmt.x - p_connection.getOutputElement().m_easelElmt.x));
                if (p_connection.getInputElement().m_easelElmt.x < p_connection.getOutputElement().m_easelElmt.x) {
                    p_connection.m_easelElmt.getChildAt(0).rotation = 180 + p_connection.m_easelElmt.getChildAt(0).rotation;
                }
                //stage.addChildAt(c.easelElmt, 0);
                //update = true;
            };
            GUIHandler.prototype.addToSelection = function (p_easelElmt) {
                ////console.log("selected: " + this.m_selectedItems);
                if (this.m_selectedItems.indexOf(p_easelElmt) === -1 && p_easelElmt.name.substr(0, 4) === "elmt") {
                    var elmt = this.m_model.getElement(p_easelElmt.name);
                    for (var i in elmt.getConnections) {
                    }
                    this.m_selectedItems.push(p_easelElmt);
                    ////console.log("pushed " + p_easelElmt);
                    if (this.m_model.m_bbnMode) {
                        this.m_selectedItems.push(elmt.m_minitableEaselElmt);
                    }
                    var elmtType = elmt.getType();
                    ////////console.log(e);
                    var shape = p_easelElmt.getChildAt(0);
                    if (elmt.m_dstType === 1) {
                        shape.graphics.clear().f(this.m_elementColors[elmtType - 100][2]).s(this.m_elementColors[elmtType - 100][1]);
                    }
                    else {
                        shape.graphics.clear().f(this.m_elementColors[elmtType][2]).s(this.m_elementColors[elmtType][1]);
                    }
                    var elmtShapeType = 2;
                    if (this.m_model.m_bbnMode)
                        elmtShapeType = elmtType;
                    switch (elmtShapeType) {
                        case 0:
                            //chance
                            shape.graphics.drawEllipse(0, 0, 150, 30);
                            break;
                        case 1:
                            //decision
                            shape.graphics.drawRect(0, 0, 150, 30);
                            break;
                        case 2:
                            //Value
                            shape.graphics.setStrokeStyle(3).drawRoundRect(0, 0, 175, 35, 10);
                        default:
                            break;
                    }
                    this.m_updateMCAStage = true;
                    //this.m_updateMCATables = true;
                    this.m_skipUpdateDropDowns = true;
                }
                else if (this.m_model.m_bbnMode && this.m_selectedItems.indexOf(p_easelElmt) !== -1 && p_easelElmt.name.substr(0, 4) === "elmt") {
                    ////console.log("selected: " + this.m_selectedItems);
                    ////console.log("element already selected");
                    var elmt = this.m_model.getElement(p_easelElmt.name);
                    var newSelected = [];
                    this.m_selectedItems.forEach(function (e) {
                        ////console.log("checking " + e + " against " + p_easelElmt);
                        if (e.toString() !== p_easelElmt.toString()) {
                            ////console.log("not a match");
                            newSelected.push(e);
                        }
                        else {
                        }
                    });
                    this.m_selectedItems = newSelected;
                    ////console.log("new selected: " + this.m_selectedItems);
                    var easelElmt = p_easelElmt;
                    var elmtType = this.m_model.getElement(easelElmt.name).getType();
                    var shape = easelElmt.getChildAt(0);
                    shape.graphics.clear().f(this.m_elementColors[elmtType][0]).s(this.m_elementColors[elmtType][1]);
                    var elmtShapeType = 2;
                    if (this.m_model.m_bbnMode)
                        elmtShapeType = elmtType;
                    switch (elmtShapeType) {
                        case 0:
                            //chance
                            shape.graphics.drawEllipse(0, 0, 150, 30);
                            break;
                        case 1:
                            //decision
                            shape.graphics.drawRect(0, 0, 150, 30);
                            break;
                        case 2:
                            //Value
                            shape.graphics.drawRoundRect(0, 0, 150, 30, 10);
                            break;
                        default:
                            break;
                    }
                    this.m_updateMCAStage = true;
                    //this.m_updateMCATables = true;
                    this.m_skipUpdateDropDowns = true;
                }
                //for (var index in this.m_selectedItems) {
                //    //console.log("selected: " + this.m_selectedItems[index]);
                //    for (var ind in this.m_selectedItems[index].
                //}
            };
            GUIHandler.prototype.setSelection = function (p_easelElmt) {
                this.clearSelection();
                //////console.log(p_easelElmt);
                for (var i = 0; i < p_easelElmt.length; i++) {
                    this.addToSelection(p_easelElmt[i]);
                }
            };
            GUIHandler.prototype.getSelected = function () {
                return this.m_selectedItems;
            };
            GUIHandler.prototype.clearSelection = function () {
                ////console.log("clear");
                for (var i = 0; i < this.m_selectedItems.length; i++) {
                    var easelElmt = this.m_selectedItems[i];
                    if (true) {
                        var elmtType = this.m_model.getElement(easelElmt.name).getType();
                        var shape = easelElmt.getChildAt(0);
                        if (this.m_model.getElement(easelElmt.name).m_dstType === 1) {
                            shape.graphics.clear().f(this.m_elementColors[elmtType - 100][0]).s(this.m_elementColors[elmtType - 100][1]);
                        }
                        else {
                            shape.graphics.clear().f(this.m_elementColors[elmtType][0]).s(this.m_elementColors[elmtType][1]);
                        }
                        var elmtShapeType = 2;
                        if (this.m_model.m_bbnMode)
                            elmtShapeType = elmtType;
                        switch (elmtShapeType) {
                            case 0:
                                //chance
                                shape.graphics.drawEllipse(0, 0, 150, 30);
                                break;
                            case 1:
                                //decision
                                shape.graphics.drawRect(0, 0, 150, 30);
                                break;
                            case 2:
                                //Value
                                shape.graphics.drawRoundRect(0, 0, 175, 35, 10);
                                break;
                            default:
                                break;
                        }
                    }
                }
                this.m_selectedItems = [];
                this.m_updateMCAStage = true;
            };
            GUIHandler.prototype.deleteConnectionsFromElement = function (p_elmt) {
                for (var i = 0; i < p_elmt.getConnections().length; i++) {
                    debugger;
                    //var elmt = p_elmt.getConnections()[i].getOutputElement();
                    //switch (elmt.getType()) {
                    //    case 0:
                    //        break;
                    //    case 1:
                    //        for (var j = 0; j < elmt.getConnections().length; j++) {
                    //            if (elmt.getConnections()[j].getID() === 
                    //        break;
                    //    case 2:
                    //        break;
                    //    case 3:
                    //        break;
                    //}
                    this.m_mcaContainer.removeChild(p_elmt.getConnections()[i].m_easelElmt);
                    this.m_model.deleteConnection(p_elmt.getConnections()[i].getID());
                    this.m_updateMCAStage = true;
                    this.m_updateMCATables = true;
                }
            };
            GUIHandler.prototype.addDataRowClick = function (p_evt) {
                ////console.log("add row");
                var elmt = $("#detailsDialog").data("element");
                elmt.setData(DST.Tools.addDataRow(elmt));
                elmt.update();
                //Create the html tabel again and add the edit function again
                var s = DST.Tools.htmlTableFromArray("Definition", elmt, this.m_model, this.m_editorMode);
                $("#defTable_div").html(s);
                this.addEditFunction(elmt, this.m_editorMode);
                var newStateName = elmt.getData()[elmt.getData().length - 1][0];
                //Add default values for the new state in all children
                elmt.getChildrenElements().forEach(function (e) {
                    e.setData(e.updateHeaderRows(e.getData()));
                    e.setData(e.addDefaultDataInEmptyCells(e.getData(), elmt, newStateName));
                });
                elmt.getAllDescendants().forEach(function (e) {
                    e.setUpdated(false);
                });
            };
            GUIHandler.prototype.removeRow = function (p_element, p_n) {
                ////console.log("remove row " + p_n + " in " + p_element.getName());
                var data = DST.Tools.makeSureItsTwoDimensional(p_element.getDataOld());
                var state = data[p_n][0];
                if (data.length - DST.Tools.numOfHeaderRows(data) < 3) {
                    alert("Can not be less than two outcomes");
                }
                else {
                    p_element.setData(DST.Tools.removeRow(p_element.getDataOld(), p_n));
                    //Remove this state from all children data tables
                    p_element.getChildrenElements().forEach(function (e) {
                        e.setData(DST.Tools.removeState(e.getDataOld(), p_element, state));
                    });
                    p_element.getAllDescendants().forEach(function (e) {
                        e.setUpdated(false);
                    });
                }
            };
            GUIHandler.prototype.updateSADropdown = function () {
                $("#elementSelect > option").remove();
                if (this.m_model !== undefined) {
                    //for (var e of this.m_model.getElementArr()) {
                    //    if (e.getType() !== 102 && e.getType() != 100) {
                    //        //var tmp333 = "<option id='es" + e.getID() + "'>" + e.getName() + "</option>";
                    //        //var tm12 = this.m_model.getMainObj();
                    //        if (e == this.m_model.getMainObj())
                    //            $("#elementSelect").append("<option id='es" + e.getID() + "' selected >" + e.getName() + "</option>");
                    //        else
                    //            $("#elementSelect").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                    //    }
                    //}
                    for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                        var e = _a[_i];
                        if (e.getType() === 103) {
                            $("#elementSelect").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                        }
                    }
                    for (var _b = 0, _c = this.m_model.getElementArr(); _b < _c.length; _b++) {
                        var e = _c[_b];
                        if (e.getType() === 101) {
                            $("#elementSelect").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                        }
                    }
                    for (var _d = 0, _e = this.m_model.getElementArr(); _d < _e.length; _d++) {
                        var e = _e[_d];
                        if (e.getType() === 100) {
                            $("#elementSelect").append("<option id='es" + e.getID() + "'>" + e.getName() + "</option>");
                        }
                    }
                    this.updateSASubDropdown();
                    //this.setSliderValue();
                    this.updateSA();
                    $("#elementSelect").selectmenu('refresh');
                }
            };
            GUIHandler.prototype.updateSASubDropdown = function () {
                var tthis = this;
                $("#elementSubSelect > option").remove();
                this.m_SAChosenSubElement = null;
                var tmp45 = this.m_SAChosenElement;
                var e = this.m_model.getElement($("#elementSelect > option:selected").attr('id').substring(2)); //id of the element selected in the dropdown
                if (e.getType() !== 100) {
                    for (var _i = 0, _a = e.getConnections(); _i < _a.length; _i++) {
                        var con = _a[_i];
                        var t = con.getOutputElement().getID();
                        var t2 = e.getID();
                        if (con.getOutputElement().getID() === e.getID()) {
                            if (this.m_SAChosenSubElement === null)
                                this.m_SAChosenSubElement = con.getInputElement();
                            $("#elementSubSelect").append("<option id='sub" + con.getInputElement().getID() + "'>" + con.getInputElement().getName() + "</option>");
                        }
                    }
                }
                else {
                    for (var _b = 0, _c = this.m_model.getElementArr(); _b < _c.length; _b++) {
                        var elmt = _c[_b];
                        if (elmt.getType() === 102) {
                            if (this.m_SAChosenSubElement === null)
                                this.m_SAChosenSubElement = elmt;
                            $("#elementSubSelect").append("<option id='sub" + elmt.getID() + "'>" + elmt.getName() + "</option>");
                        }
                    }
                }
                $("#elementSubSelect").selectmenu('refresh');
                this.updateChartData(this.m_SAChosenElement);
                this.setSliderValue();
                this.updateSATableData();
            };
            GUIHandler.prototype.updateChartData = function (p_elmt) {
                if (this.m_SAChosenSubElement == null)
                    this.m_SAChosenSubElement = this.m_SAChosenElement.getParentElements()[0];
                this.m_pointOld = null;
                //console.log("updating Scatter and Table " + p_elmt.getName());
                ////console.log("pwlData Before: " + this.m_pwlDataArray);
                this.m_pwlDataArray.length = 0;
                var i = 1;
                this.m_pwlDataArray[0] = [];
                this.m_pwlDataArray[0][0] = 'kk';
                for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                    var el = _a[_i];
                    if (el.getType() === 102 && el.m_disregard == false) {
                        this.m_pwlDataArray[0][i++] = el.getName();
                    }
                }
                var tmp = p_elmt.getType();
                if (p_elmt.getType() === 100) {
                    // setting x-values
                    for (var l = 1; l < p_elmt.getPwlVF().getPoints().length + 1; l++) {
                        this.m_pwlDataArray[l] = [];
                        this.m_pwlDataArray[l][0] = p_elmt.getPwlVF().getPoints()[l - 1].x;
                    }
                    ////console.log(this.m_pwlDataArray);
                    //setting y-values
                    var j = 1;
                    var ix = 1;
                    for (var _b = 0, _c = this.m_model.getElementArr(); _b < _c.length; _b++) {
                        var e = _c[_b];
                        if (e.getType() === 102) {
                            if (e.m_disregard == false) {
                                this.m_pwlDataArray[1][ix] = 0;
                                var spw = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, p_elmt, 0);
                                for (var m = 1; m < spw[0].length; m++) {
                                    //var tmp1 = spw[j + 2][m];
                                    this.m_pwlDataArray[1][ix] += spw[j + 2][m];
                                }
                                this.m_pwlDataArray[2][ix] = 0;
                                var epw = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, p_elmt, 100);
                                for (var m = 1; m < epw[0].length; m++) {
                                    //var tmp2 = epw[j + 2][m];
                                    this.m_pwlDataArray[p_elmt.getPwlVF().getPoints().length][ix] += epw[j + 2][m];
                                }
                                for (var n = 2; n < p_elmt.getPwlVF().getPoints().length + 1; n++) {
                                    this.m_pwlDataArray[n][ix] = 0;
                                    if (e === this.m_SAChosenSubElement) {
                                        var tmp8 = this.m_pwlDataArray[n][0];
                                        var mpw = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, p_elmt, this.m_pwlDataArray[n][0]);
                                        for (var m = 1; m < epw[0].length; m++) {
                                            this.m_pwlDataArray[n][j] = this.m_pwlDataArray[n][ix] += mpw[j + 2][m];
                                        }
                                    }
                                    else {
                                        this.m_pwlDataArray[n][ix] = this.m_pwlDataArray[1][ix];
                                    }
                                }
                                ix++;
                            }
                            j++;
                        }
                    }
                    var tmp5 = this.m_pwlDataArray;
                    this.m_lineOptions.hAxis.title = p_elmt.m_dataUnit;
                    this.m_lineOptions.title = this.m_SAChosenElement.getName();
                }
                else if (p_elmt.getType() === 101 || p_elmt.getType() === 103) {
                    for (var l = 1; l < 3; l++) {
                        this.m_pwlDataArray[l] = [];
                    }
                    this.m_pwlDataArray[1][0] = 0;
                    this.m_pwlDataArray[2][0] = 100;
                    ////console.log(this.m_pwlDataArray);
                    var ix = 1;
                    for (var j = 1; j < i; j++) {
                        var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[j - 1]];
                        this.m_pwlDataArray[1][ix] = 0;
                        this.m_pwlDataArray[2][ix] = 0;
                        ix++;
                    }
                    ix = 1;
                    for (var j = 1; j < this.m_model.m_altIndex.length + 1; j++) {
                        var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[j - 1]];
                        {
                            var startPointWeights = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, this.m_SAChosenElement, 0);
                            for (var m = 1; m < startPointWeights[0].length; m++) {
                                //var tmp11 = startPointWeights[j + 2][m];
                                if (elmt.m_disregard == false) {
                                    this.m_pwlDataArray[1][ix] += startPointWeights[j + 2][m];
                                }
                            }
                            var endPointWeights = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, this.m_SAChosenElement, 100);
                            for (var m = 1; m < endPointWeights[0].length; m++) {
                                //var tmp12 = endPointWeights[j + 2][m];
                                if (elmt.m_disregard == false) {
                                    this.m_pwlDataArray[2][ix] += endPointWeights[j + 2][m];
                                }
                            }
                            if (elmt.m_disregard == false) {
                                ix++;
                            }
                        }
                    }
                    ////console.log(this.m_pwlDataArray);
                    if (this.m_SAChosenSubElement == null)
                        this.m_SAChosenSubElement = this.m_SAChosenElement.getParentElements()[0];
                    this.m_lineOptions.hAxis.title = this.m_SAChosenSubElement.getName();
                    this.m_lineOptions.title = this.m_SAChosenElement.getName();
                }
                else {
                }
                ////console.log("pwlData After: " + this.m_pwlDataArray);
                var tmp5 = this.m_pwlDataArray;
                //updating chart options
                //var tmp6 = this.m_pwlDataArray[1][0];
                //var tmp7 = this.m_pwlDataArray[2][0];
                this.m_lineOptions.hAxis.minValue = this.m_pwlDataArray[1][0];
                this.m_lineOptions.hAxis.maxValue = this.m_pwlDataArray[2][0];
            };
            GUIHandler.prototype.updateSATableData = function () {
                if (this.m_SAChosenElement.getType() === 100) {
                }
                var ix = 1;
                this.m_altData.length = 1;
                var tm1 = this.m_model.getMainObjective();
                var tm1 = this.m_SAChosenSubElement;
                var tm1 = this.m_model.getMainObjective();
                var tm1 = this.m_model.getMainObjective();
                var finalScores = this.m_model.getScore(this.m_model.getMainObjective(), null, this.m_SAChosenSubElement, this.m_SAChosenElement, this.m_SASliderValue);
                for (var k = 1; k < finalScores.length - 2; k++) {
                    var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[k - 1]];
                    if (elmt.m_disregard == false) {
                        this.m_altData[ix] = [];
                        this.m_altData[ix][1] = 0;
                        ix++;
                    }
                }
                ix = 1;
                for (var i = 3; i < finalScores.length; i++) {
                    var elmt = this.m_model.getElementArr()[this.m_model.m_altIndex[i - 3]];
                    if (elmt.m_disregard == false) {
                        this.m_altData[ix][0] = finalScores[i][0];
                        for (var j = 1; j < finalScores[0].length; j++) {
                            this.m_altData[ix][1] += finalScores[i][j];
                        }
                        ix++;
                    }
                }
            };
            GUIHandler.prototype.updateSA = function () {
                var pwlData = google.visualization.arrayToDataTable(this.m_pwlDataArray);
                var alternativeData = google.visualization.arrayToDataTable(this.m_altData);
                this.m_SAScatterChart.draw(pwlData, this.m_lineOptions);
                this.m_SATableChart.draw(alternativeData, this.m_tableOptions);
            };
            GUIHandler.prototype.setSliderValue = function () {
                if (this.m_SAChosenElement == null) {
                    this.m_SAChosenElement = this.m_model.getMainObj();
                    this.m_SAChosenSubElement = this.m_SAChosenElement.getParentElements()[0];
                }
                if (this.m_SAChosenElement.getType() !== 100) {
                    for (var index in this.m_SAChosenElement.m_swingWeightsArr) {
                        var tmp22 = this.m_SAChosenElement.m_swingWeightsArr[index][0];
                        if (this.m_SAChosenSubElement != null) {
                            var tmp23 = this.m_SAChosenElement.m_swingWeightsArr[index][0];
                            //var tmp24 = this.m_SAChosenSubElement.getConnections()[0].getID();
                            for (var _i = 0, _a = this.m_SAChosenSubElement.getConnections(); _i < _a.length; _i++) {
                                var k = _a[_i];
                                if (this.m_SAChosenElement.m_swingWeightsArr[index][0] === k.getID()) {
                                    this.m_SASliderValue = this.m_SAChosenElement.m_swingWeightsArr[index][1];
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    var index2 = 0;
                    for (var _b = 0, _c = this.m_model.getElementArr(); _b < _c.length; _b++) {
                        var elm = _c[_b];
                        if (elm.getType() === 102) {
                            if (this.m_SAChosenSubElement.getID() !== elm.getID())
                                index2++;
                            else
                                this.m_SASliderValue = this.m_SAChosenElement.getDataArr()[index2];
                        }
                    }
                }
                $("#sliderControl_div").slider('value', this.m_SASliderValue);
                $("#sliderValDebug").html('' + this.m_SASliderValue);
                $("#sliderValNormDebug").html('' + this.m_SASliderValue);
            };
            GUIHandler.prototype.getCritSelected = function () {
                var critSelected = 0;
                var segmentSelectedId = $("#finalScoreSegmentOverview_select > option:selected").attr('id');
                if (segmentSelectedId != undefined && segmentSelectedId.substring(8) !== "Alts") {
                    critSelected = parseInt(segmentSelectedId.substring(8));
                }
                return critSelected;
            };
            GUIHandler.prototype.removeAllShadows = function () {
                for (var _i = 0, _a = this.m_model.getElementArr(); _i < _a.length; _i++) {
                    var elmt = _a[_i];
                    elmt.m_easelElmt.shadow = null;
                }
            };
            GUIHandler.prototype.addShadowsToParents = function (p_elmt) {
                var tchld = p_elmt.getChildrenElements();
                var tpar = p_elmt.getParentElements();
                var tcs = this.getCritSelected();
                var tcl = p_elmt.m_criteriaLevel;
                if (this.getCritSelected() > p_elmt.m_criteriaLevel) {
                    for (var _i = 0, _a = p_elmt.getChildrenElements(); _i < _a.length; _i++) {
                        var chld = _a[_i];
                        this.addShadowsToParents(chld);
                        chld.m_easelElmt.shadow = this.m_finalScoreShadow;
                    }
                }
            };
            return GUIHandler;
        }());
        DST.GUIHandler = GUIHandler;
    })(DST = Mareframe.DST || (Mareframe.DST = {}));
})(Mareframe || (Mareframe = {}));
//# sourceMappingURL=MareframeGUI.js.map