import React, { useState, useRef, useCallback } from 'react';
import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapGL, {NavigationControl, Marker, Popup, Layer, Source} from "react-map-gl";
import { BsFillCircleFill, BsFillBarChartFill } from "react-icons/bs";
import { GiWaterRecycling } from "react-icons/gi";
import { BiLineChart } from "react-icons/bi";

//regions
import CharlottesvilleLimits from './Charlottesville.json';
import ChesapeakeLimits from './Chesapeake.json';
import NorfolkLimits from './Norfolk.json';
import PortsmouthLimits from './Portsmouth.json';
import SuffolkLimits from './Suffolk.json';
import VaBeachLimits from './VaBeach.json';
import HamptonLimits from './Hampton.json'; 
import NewportNewsLimits from './NewportNews.json'; 

// import Data2 from './Data2.json';
import './Reports.css';
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line, Label } from "recharts"; 
import { chartData1a, chartData1b, chartData2a, chartData2b, chartData3a, chartData3b, chartData4a, chartData4b } from "./ChartData.js"; 
import Switch from "react-switch";

const Reports = () => {
    //cvill
    const [viewport, setViewport] = useState({
        latitude: 38.031479,
        longitude: -78.481272,
        width: window.innerWidth*0.50, //50vw
        height: "600px", 
        zoom: 13,
    });

    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );

      //hampton roads
      const [viewport1, setViewport1] = useState({
        latitude: 36.841258,
        longitude: -76.383983,
        width: window.innerWidth*0.50, //50vw
        height: "600px", 
        zoom: 9,
    });

    const mapRef1 = useRef();
    const handleViewportChange1 = useCallback(
        (newViewport) => setViewport1(newViewport),
        []
    );

    const handleGeocoderViewportChange1 = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
     
          return handleViewportChange1({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );

    const [showPopup, setShowPopup] = useState(null);

    let activeTabColor = "#1197E8";
    let inactiveTabColor = "#b1b6b8";
    let activeBorderTabColor = "3px solid #1197E8";
    let inactiveBorderTabColor = "3px solid #b1b6b8";

    const[tabTextColor, setTabTextColor] = useState(activeTabColor);
    const[tabTextColor1, setTabTextColor1] = useState(inactiveTabColor);
    const[tabBorderColor, setTabBorderColor] = useState(activeBorderTabColor);
    const[tabBorderColor1, setTabBorderColor1] = useState(inactiveBorderTabColor);

    const[cvillActive, setCvillActive] = useState(true);
    const[hamptonActive, setHamptonActive] = useState(false); 

    let activeColor = 'rgba(52, 235, 183, 0.8)'; 
    let inactiveColor = 'rgba(52, 220, 235, 0.5)'; 
    let activeRegionColor = 'rgba(235, 255, 255, 0.2)';
    let inactiveRegionColor = 'rgba(255, 255, 255, 0.1)';

    const [locationColor, setLocationColor] = useState(inactiveColor);
    const [locationColor1, setLocationColor1] = useState(inactiveColor);
    const [locationColor2, setLocationColor2] = useState(inactiveColor);
    const [locationColor3, setLocationColor3] = useState(inactiveColor);

    const [regionLineColorCvill, setRegionLineColorCvill] = useState(inactiveRegionColor);

    const [regionLineColorChesapeake, setRegionLineColorChesapeake] = useState(inactiveRegionColor);
    const [regionLineColorHampton, setRegionLineColorHampton] = useState(inactiveRegionColor);
    const [regionLineColorSuffolk, setRegionLineColorSuffolk] = useState(inactiveRegionColor); 
    const [regionLineColorNewportNews, setRegionLineColorNewportNews] = useState(inactiveRegionColor);
    const [regionLineColorNorfolk, setRegionLineColorNorfolk] = useState(inactiveRegionColor);
    const [regionLineColorPortsmouth, setRegionLineColorPortsmouth] = useState(inactiveRegionColor);
    const [regionLineColorVaBeach, setRegionLineColorVaBeach] = useState(inactiveRegionColor); 

    const [showChart, setShowChart] = useState(null);

    const DataFormaterX = (date) => {
        return date.split(",")[0]; 
    }

    const DataFormaterY = (number) => {
        if(number > 1000000000){
            return (number/1000000000).toString() + 'B';
        }else if(number > 1000000){
            return (number/1000000).toString() + 'M';
        }else if(number > 1000){
            return (number/1000).toString() + 'K';
        }else{
            return number.toString();
        }
    }

      const [checked, setChecked] = useState(true); 

    return(
        <div className="App">
            <h1 style={{margin: 20}}><strong>Data Reports</strong></h1>
            
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: 30}}>
                <div style={{ width: "50vw", borderBottom: tabBorderColor, cursor: "pointer", backgroundColor: "whitesmoke", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
                onClick = {() => {
                    setTabTextColor(activeTabColor);
                    setTabBorderColor(activeBorderTabColor); 
                    setTabTextColor1(inactiveTabColor);
                    setTabBorderColor1(inactiveBorderTabColor); 
                    setCvillActive(true);
                    setHamptonActive(false);

                    setShowChart(null); 
                    setLocationColor(inactiveColor);
                    setLocationColor1(inactiveColor);
                    setLocationColor2(inactiveColor);
                    setLocationColor3(inactiveColor); 
                }}
                >
                    <strong style={{color: tabTextColor}}>Charlottesville Area</strong>
                </div>
                <div style={{ width: "50vw", borderBottom: tabBorderColor1, cursor: "pointer", backgroundColor: "whitesmoke", borderTopRightRadius: 10, borderBottomRightRadius: 10}}
                onClick = {() => {
                    setTabTextColor1(activeTabColor);
                    setTabBorderColor1(activeBorderTabColor); 
                    setTabTextColor(inactiveTabColor);
                    setTabBorderColor(inactiveBorderTabColor);
                    setHamptonActive(true);
                    setCvillActive(false); 

                    setShowChart(null);
                    setLocationColor(inactiveColor);
                    setLocationColor1(inactiveColor);
                    setLocationColor2(inactiveColor);
                    setLocationColor3(inactiveColor); 
                }}
                >
                    <strong style={{color: tabTextColor1}}>Hampton Roads Area</strong>
                </div>
            </div>
            <div className="toggle-button">
                <BiLineChart size={20} style={{marginRight: 10, marginTop: 5}}/>
                <label>
                    <Switch onChange={() => setChecked(!checked)} checked={checked} checkedIcon={false} uncheckedIcon={false} onColor="#c0c4c2" offColor="#c0c4c2"/>
                </label>
                <BsFillBarChartFill size={20} style={{marginLeft: 10, marginTop: 5}}/>
            </div>
            {cvillActive && <div>
            <div className="map-chart-container">
            <div>
                <MapGL
                className="map-view-container"
                    ref={mapRef}
                    {...viewport}
                    onViewportChange={handleViewportChange}
                    mapStyle = "mapbox://styles/noahb20/ckigtszgw173519qy1c0t05va"
                    mapboxApiAccessToken = "pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                >
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                    <NavigationControl />
                    </div>
                    <Geocoder
                    mapRef={mapRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken="pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                    position="top-left"
                    />
                    <Marker latitude={38.0293} longitude={-78.4767} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() => {
                        setShowPopup(0);
                        setLocationColor(activeColor);
                        setLocationColor1(inactiveColor);
                        setShowChart(0);
                    }}
                    onMouseOver={() => {
                        setShowPopup(0);
                        setRegionLineColorCvill(activeRegionColor);
                    }}
                    onMouseLeave={() => {
                        setShowPopup(null); 
                        setRegionLineColorCvill(inactiveRegionColor);
                    }}
                    >
                        <GiWaterRecycling style={{color: locationColor}} size={30}/>
                    </div>
                </Marker>
                {showPopup === 0 && 
                    <Popup
                        latitude={38.0293}
                        longitude={-78.4767}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #1</div>
                    </Popup>}  
                <Marker latitude={38.03501} longitude={-78.50425} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() =>{
                         setShowPopup(1);
                         setLocationColor1(activeColor);
                         setLocationColor(inactiveColor);
                         setShowChart(1);
                         }}
                         onMouseOver={() => {
                            setShowPopup(1);
                            setRegionLineColorCvill(activeRegionColor);
                        }}
                        onMouseLeave={() => {
                            setShowPopup(null);
                            setRegionLineColorCvill(inactiveRegionColor);
                        }}
                         >
                             <GiWaterRecycling style={{color: locationColor1}} size={30}/>
                         </div>
                </Marker>
                {showPopup === 1 && 
                    <Popup
                        latitude={38.03501}
                        longitude={-78.50425}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #2</div>
                    </Popup>}

                  
                   <div>
                    <Source id='polylineLayer' type='geojson' data={CharlottesvilleLimits}>
                        <Layer
                        id='lineLayer' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>

                    <Source id='polygon' type='geojson' data={CharlottesvilleLimits}>
                        <Layer
                        id= 'aoi-solid-fill'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorCvill,
                         }}
                        />
                    </Source>
                    </div>  
                    {/* <div>
                    <Source id='polylineLayer2' type='geojson' data={Data2}>
                        <Layer
                        id='lineLayer2' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(0, 0, 0, 0.5)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon2' type='geojson' data={Data2}>
                        <Layer
                        id= 'aoi-solid-fill2'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': 'rgba(255, 255, 255, 0.3)',
                         }}
                        />
                    </Source>
                    </div> */}
                </MapGL>
            </div>
            <div>
                {((showChart == null || showChart === 0) && checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #1</strong>
                    <p style={{color: 'gray'}}>The Test Location #1 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #1,...</p>  
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData1a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                    <div>
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData1b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {((showChart == null || showChart === 0) && !checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #1</strong>
                    <p style={{color: 'gray'}}>The Test Location #1 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #1,...</p>  
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData1a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                    <div>
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData1b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {(showChart === 1 && checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #2</strong>
                    <p style={{color: 'gray'}}>The Test Location #2 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #2,...</p>  
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData2a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                    <div>
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData2b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {(showChart === 1 && !checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #2</strong>
                    <p style={{color: 'gray'}}>The Test Location #2 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #2,...</p>  
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData2a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                    <div>
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData2b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
            </div>
            </div>
            
            {checked && <div className="bottom-chart-view-container">
                <strong style={{fontSize: 20}}>Wastewater SARS-CoV-2 Data</strong>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData1a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                                <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData2a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData3a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData4a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                </div>
                <strong style={{fontSize: 20}}>Case Data</strong>
                <p style={{color: 'gray'}}>By date of specimen collection</p>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData1b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData2b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData3b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData4b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                </div>
                <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                        </div>
                        <div className="bottom-legend">
                            <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                            <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                        </div>
            </div>}

            {!checked && <div className="bottom-chart-view-container">
                <strong style={{fontSize: 20}}>Wastewater SARS-CoV-2 Data</strong>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData1a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                                <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData2a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData3a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData4a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                </div>
                <strong style={{fontSize: 20}}>Case Data</strong>
                <p style={{color: 'gray'}}>By date of specimen collection</p>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData1b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData2b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData3b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData4b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                </div>
                <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                        </div>
                        <div className="bottom-legend">
                            <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                            <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                        </div>
            </div>}

          
           </div>} 
           {hamptonActive && <div>
            <div className="map-chart-container">
            <div>
                <MapGL
                className="map-view-container"
                    ref={mapRef1}
                    {...viewport1}
                    onViewportChange={handleViewportChange1}
                    mapStyle = "mapbox://styles/noahb20/ckigtszgw173519qy1c0t05va"
                    mapboxApiAccessToken = "pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                >
                    <div style={{position: 'absolute', right: 10, top: 10}}>
                    <NavigationControl />
                    </div>
                    <Geocoder
                    mapRef={mapRef1}
                    onViewportChange={handleGeocoderViewportChange1}
                    mapboxApiAccessToken="pk.eyJ1Ijoibm9haGIyMCIsImEiOiJja2lkb2RlaGMwNGR4Mnhxd21sbWxyeWVnIn0.SLuqIEAYEE2gY0ZNw5ySHA"
                    position="top-left"
                    />
                    <Marker latitude={36.83399572935205} longitude={-76.30274523863231} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() => {
                        setShowPopup(2);
                        setLocationColor2(activeColor);
                        setLocationColor3(inactiveColor);
                        setShowChart(2);
                    }}
                    onMouseOver={() => {
                        setShowPopup(2);
                        setRegionLineColorPortsmouth(activeRegionColor);
                    }}
                    onMouseLeave={() => {
                        setShowPopup(null); 
                        setRegionLineColorPortsmouth(inactiveRegionColor);
                    }}
                    >
                        <GiWaterRecycling style={{color: locationColor2}} size={30}/>
                    </div>
                </Marker>
                {showPopup === 2 && 
                    <Popup
                        latitude={36.83399572935205}
                        longitude={-76.30274523863231}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #3</div>
                    </Popup>}
                <Marker latitude={36.99906646301743} longitude={-76.41358453874881} offsetLeft={-20} offsetTop={-10}
                >
                    <div onClick={() =>{
                         setShowPopup(3);
                         setLocationColor3(activeColor);
                         setLocationColor2(inactiveColor);
                         setShowChart(3);
                         }}
                         onMouseOver={() => {
                            setShowPopup(3);
                            setRegionLineColorNewportNews(activeRegionColor);
                        }}
                        onMouseLeave={() => {
                            setShowPopup(null);
                            setRegionLineColorNewportNews(inactiveRegionColor);
                        }}
                         >
                             <GiWaterRecycling style={{color: locationColor3}} size={30}/>
                         </div>
                </Marker>
                {showPopup === 3 && 
                    <Popup
                        latitude={36.99906646301743}
                        longitude={-76.41358453874881}
                        closeButton={false}
                        closeOnClick={false}
                        tipSize={0}
                        offsetTop={-10}
                        >
                        <div>Test Location #4</div>
                    </Popup>}

                  
                   <div>
                    <Source id='polylineLayer' type='geojson' data={ChesapeakeLimits}>
                        <Layer
                        id='lineLayer' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>

                    <Source id='polygon' type='geojson' data={ChesapeakeLimits}>
                        <Layer
                        id= 'aoi-solid-fill'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorChesapeake,
                         }}
                        />
                    </Source>
                    </div>  

                    <div>
                    <Source id='polylineLayer2' type='geojson' data={NorfolkLimits}>
                        <Layer
                        id='lineLayer2' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon2' type='geojson' data={NorfolkLimits}>
                        <Layer
                        id= 'aoi-solid-fill2'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorNorfolk,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer3' type='geojson' data={PortsmouthLimits}>
                        <Layer
                        id='lineLayer3' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon3' type='geojson' data={PortsmouthLimits}>
                        <Layer
                        id= 'aoi-solid-fill3'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorPortsmouth,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer4' type='geojson' data={SuffolkLimits}>
                        <Layer
                        id='lineLayer4' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon4' type='geojson' data={SuffolkLimits}>
                        <Layer
                        id= 'aoi-solid-fill4'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorSuffolk,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer5' type='geojson' data={VaBeachLimits}>
                        <Layer
                        id='lineLayer5' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon5' type='geojson' data={VaBeachLimits}>
                        <Layer
                        id= 'aoi-solid-fill5'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorVaBeach,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer6' type='geojson' data={HamptonLimits}>
                        <Layer
                        id='lineLayer6' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon6' type='geojson' data={HamptonLimits}>
                        <Layer
                        id= 'aoi-solid-fill6'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorHampton,
                         }}
                        />
                    </Source>
                    </div>

                    <div>
                    <Source id='polylineLayer7' type='geojson' data={NewportNewsLimits}>
                        <Layer
                        id='lineLayer7' //lineLayer
                        type='line' //line
                        source='my-data'
                        layout={{
                        'line-join': 'round',
                        'line-cap': 'round',
                        }}
                        paint={{
                        'line-color': 'rgba(235, 201, 52, 1)',
                            'line-width': 1,
                        }}
                        />
                    </Source>
                    <Source id='polygon7' type='geojson' data={NewportNewsLimits}>
                        <Layer
                        id= 'aoi-solid-fill7'
                        source= 'aoi' 
                        type= 'fill'
                        paint= {{ 
                            'fill-color': regionLineColorNewportNews,
                         }}
                        />
                    </Source>
                    </div>

                </MapGL>
            </div>
            <div>
                {((showChart == null || showChart === 2) && checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #3</strong>
                    <p style={{color: 'gray'}}>The Test Location #3 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #3,...</p>  
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData3a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                    <div>
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData3b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {((showChart == null || showChart === 2) && !checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #3</strong>
                    <p style={{color: 'gray'}}>The Test Location #3 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #3,...</p>  
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData3a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                    <div>
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData3b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {(showChart === 3 && checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #4</strong>
                    <p style={{color: 'gray'}}>The Test Location #4 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #4,...</p>  
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData4a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="copies/mL" fill="#4B93E2" />
                    </BarChart>
                    <div>
                    <BarChart width={window.innerWidth*0.40} height={175} data={chartData4b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Bar dataKey="cases" fill="#000000"/>
                        <Bar dataKey="predicted cases" fill="#aaacab"/>
                    </BarChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
                {(showChart === 3 && !checked) &&
                <div className="chart-view-container">
                    <strong style={{fontSize: 20}}>Test Location #4</strong>
                    <p style={{color: 'gray'}}>The Test Location #4 serves # people.</p>
                    <p style={{color: 'gray'}}>Areas served: Test Location #4,...</p>  
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData4a} style={{marginBottom: 20}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                            <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                    </LineChart>
                    <div>
                    <LineChart width={window.innerWidth*0.40} height={175} data={chartData4b}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                        <YAxis tickFormatter={DataFormaterY}>
                        <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                        </YAxis>
                        <Tooltip />
                        <Line dataKey="cases" stroke="#000000" dot={false}/>
                        <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                    </LineChart>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                    </div>
                    <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                        <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                    </div>
                </div>}
            </div>
            </div>
            
            {checked && <div className="bottom-chart-view-container">
                <strong style={{fontSize: 20}}>Wastewater SARS-CoV-2 Data</strong>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData1a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                                <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData2a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData3a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData4a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="copies/mL" fill="#4B93E2" />
                        </BarChart>
                    </div>
                </div>
                <strong style={{fontSize: 20}}>Case Data</strong>
                <p style={{color: 'gray'}}>By date of specimen collection</p>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData1b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData2b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData3b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <BarChart width={window.innerWidth*0.20} height={175} data={chartData4b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            {/* <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/> */}
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey="cases" fill="#000000"/>
                            <Bar dataKey="predicted cases" fill="#aaacab"/>
                        </BarChart>
                    </div>
                </div>
                <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                        </div>
                        <div className="bottom-legend">
                            <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                            <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                        </div>
            </div>}

            {!checked && <div className="bottom-chart-view-container">
                <strong style={{fontSize: 20}}>Wastewater SARS-CoV-2 Data</strong>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData1a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                                <Label value="RNA (copies/mL)" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData2a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData3a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData4a} style={{marginBottom: 20}}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="copies/mL" stroke="#4B93E2" dot={false}/>
                        </LineChart>
                    </div>
                </div>
                <strong style={{fontSize: 20}}>Case Data</strong>
                <p style={{color: 'gray'}}>By date of specimen collection</p>
                <div className="chart-row">
                    <div className="chart-box">
                        <p>Test Location #1</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData1b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            <Label value="Daily cases/100K" position="insideBottomLeft" offset={10} angle={-90}/>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #2</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData2b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #3</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData3b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                    <div className="chart-box">
                        <p>Test Location #4</p>
                        <LineChart width={window.innerWidth*0.20} height={175} data={chartData4b}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={DataFormaterX}/>
                            <YAxis tickFormatter={DataFormaterY}>
                            </YAxis>
                            <Tooltip />
                            <Line dataKey="cases" stroke="#000000" dot={false}/>
                            <Line dataKey="predicted cases" stroke="#aaacab" dot={false}/>
                        </LineChart>
                    </div>
                </div>
                <div className="bottom-legend">
                        <BsFillCircleFill style={{color: '#000000', margin: 8}} size={8}/>
                        <p>Measured case data</p>
                        </div>
                        <div className="bottom-legend">
                            <BsFillCircleFill style={{color: '#aaacab', margin: 8}} size={8}/>
                            <p>Predicted case data based on wastewater SARS-CoV-2 concentrations</p>
                        </div>
            </div>}

           
           </div>}
           <p
           style = {{cursor: "pointer", color: "#3a8ee9"}}
           onClick={() => {
            alert("Click a location on the map in order to view its data report. To switch between the Charlottesville data and Hampton Roads data, use the tabs provided. Use the toggle button to switch between a line graph or bar graph.")
           }}
           >Need Help? Click here</p>
        </div>
    )
}

export default Reports; 