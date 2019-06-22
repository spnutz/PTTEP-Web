var ctx = document.getElementById('myChart');

function Checknum(val){
    if (isNaN(val)){
        return 0;
    }
    return val;
}

var x_axis = [];
var total_r_gas = [] ;
var total_r_water = [];
var total_r_oil = [];
function adddata(){
    ////////////////////////////////////// gas part ////////////////////////////////////
    let p_wave1 = Number(document.getElementById("p-wave1").value);
    let s_wave1 = Number(document.getElementById("s-wave1").value);
    let d1 = Number(document.getElementById("density1").value);

    let p_wave2 = Number(document.getElementById("p-wave2").value);
    let s_wave2 = Number(document.getElementById("s-wave2").value);
    let d2 = Number(document.getElementById("density2").value);
    
    let poisson1 = Number((cal_poisson(s_wave1,p_wave1)).toFixed(2));
    let poisson2 = Number((cal_poisson(s_wave2,p_wave2)).toFixed(2));

    let Vp_Vs1 = (p_wave1/s_wave1).toFixed(2);
    let Vp_Vs2 = (p_wave2/s_wave2).toFixed(2);
    
    let zp1 = (d1 * p_wave1).toFixed(2);
    let zp2 = (d2 * p_wave2).toFixed(2);
    
    document.getElementById("poisson1").innerHTML = "Poisson's ratio 1 : " + Checknum(poisson1);
    document.getElementById("vp_vs1").innerHTML = "Vp/Vs1 : " + Checknum(Vp_Vs1);
    document.getElementById("zp1").innerHTML = "Zp1 : " + Checknum(zp1);

    document.getElementById("poisson2").innerHTML = "Poisson's ratio 2 : " + Checknum(poisson2);
    document.getElementById("vp_vs2").innerHTML = "Vp/Vs2 : " + Checknum(Vp_Vs2);
    document.getElementById("zp2").innerHTML = "Zp2 : " + Checknum(zp2);

    ///////////////////////////// Water part //////////////////////////////////////
    let p_wave1_water = Number(document.getElementById("p-wave1_water").value);
    let s_wave1_water = Number(document.getElementById("s-wave1_water").value);
    let d1_water = Number(document.getElementById("density1_water").value);

    let p_wave2_water = Number(document.getElementById("p-wave2_water").value);
    let s_wave2_water = Number(document.getElementById("s-wave2_water").value);
    let d2_water = Number(document.getElementById("density2_water").value);
    
    let poisson1_water = Number((cal_poisson(s_wave1_water,p_wave1_water)).toFixed(2));
    let poisson2_water = Number((cal_poisson(s_wave2_water,p_wave2_water)).toFixed(2));

    let Vp_Vs1_water = (p_wave1_water/s_wave1_water).toFixed(2);
    let Vp_Vs2_water = (p_wave2_water/s_wave2_water).toFixed(2);
    
    let zp1_water = (d1_water * p_wave1_water).toFixed(2);
    let zp2_water = (d2_water * p_wave2_water).toFixed(2);
    
    document.getElementById("poisson1_water").innerHTML = "Poisson's ratio 1 : " + Checknum(poisson1_water);
    document.getElementById("vp_vs1_water").innerHTML = "Vp/Vs1 : " + Checknum(Vp_Vs1_water);
    document.getElementById("zp1_water").innerHTML = "Zp1 : " + Checknum(zp1_water);

    document.getElementById("poisson2_water").innerHTML = "Poisson's ratio 2 : " + Checknum(poisson2_water);
    document.getElementById("vp_vs2_water").innerHTML = "Vp/Vs2 : " + Checknum(Vp_Vs2_water);
    document.getElementById("zp2_water").innerHTML = "Zp2 : " + Checknum(zp2_water);

    

    ///////////////////////////// Oil part //////////////////////////////////////
    let p_wave1_oil = Number(document.getElementById("p-wave1_oil").value);
    let s_wave1_oil = Number(document.getElementById("s-wave1_oil").value);
    let d1_oil = Number(document.getElementById("density1_oil").value);

    let p_wave2_oil = Number(document.getElementById("p-wave2_oil").value);
    let s_wave2_oil = Number(document.getElementById("s-wave2_oil").value);
    let d2_oil = Number(document.getElementById("density2_oil").value);
    
    let poisson1_oil = Number((cal_poisson(s_wave1_oil,p_wave1_oil)).toFixed(2));
    let poisson2_oil = Number((cal_poisson(s_wave2_oil,p_wave2_oil)).toFixed(2));

    let Vp_Vs1_oil = (p_wave1_oil/s_wave1_oil).toFixed(2);
    let Vp_Vs2_oil = (p_wave2_oil/s_wave2_oil).toFixed(2);
    
    let zp1_oil = (d1_oil * p_wave1_oil).toFixed(2);
    let zp2_oil = (d2_oil * p_wave2_oil).toFixed(2);
    
    document.getElementById("poisson1_oil").innerHTML = "Poisson1 : " + Checknum(poisson1_oil);
    document.getElementById("vp_vs1_oil").innerHTML = "Vp/Vs1 : " + Checknum(Vp_Vs1_oil);
    document.getElementById("zp1_oil").innerHTML = "Zp1 : " + Checknum(zp1_oil);

    document.getElementById("poisson2_oil").innerHTML = "Poisson2 : " + Checknum(poisson2_oil);
    document.getElementById("vp_vs2_oil").innerHTML = "Vp/Vs2 : " + Checknum(Vp_Vs2_oil);
    document.getElementById("zp2_oil").innerHTML = "Zp2 : " + Checknum(zp2_oil);

    
    

   // Reflection
   let pi = Math.PI;
   x_axis = [];
   var i = 0;
   total_r_gas = []; // clear array
   total_r_water = [];
   total_r_oil = [];
   for(i=0;i <= 90;i++){
       let x = Number((i*pi)/180) ;
       let r = reflection(p_wave1, d1, p_wave2, d2, poisson1, poisson2, x);
       let r_water = reflection(p_wave1_water, d1, p_wave2_water, d2_water, poisson1_water, poisson2_water, x);
       let r_oil = reflection(p_wave1_oil, d1_oil, p_wave2_oil, d2_oil, poisson1_oil, poisson2_oil, x);
       total_r_gas.push(r);
       total_r_water.push(r_water);
       total_r_oil.push(r_oil);
       //x_axis.push(i);
   }
   console.log(total_r_gas);
   console.log('axis: '+x_axis);
   //// show reflection
   document.getElementById("r_gas").innerHTML = "Reflection of Gas : " + Checknum((total_r_gas[0]).toFixed(3));
   document.getElementById("r_water").innerHTML = "Reflection of Water : " + Checknum((total_r_water[0]).toFixed(3));
   document.getElementById("r_oil").innerHTML = "Reflection of Oil : " + Checknum((total_r_oil[0]).toFixed(3));
  


    
    // Line chart
    myLineChart.data.datasets[0].data = total_r_gas;
    myLineChart.data.datasets[1].data = total_r_water;
    myLineChart.data.datasets[2].data = total_r_oil;
    myLineChart.update()
   
}



// Formula
function cal_poisson(s_wave, p_wave){
    let P = Number((0.5-(s_wave/p_wave)**2)/(1-(s_wave/p_wave)**2));
    return P;
}

function reflection(P1, D1, P2, D2, poisson1, poisson2, x){
    
    try{
        let R = ((P2*D2 - P1*D1)/(P2*D2 + P1*D1))*(Math.cos(x)**2)+ (poisson2-poisson1)/((1-(poisson2+poisson1)/2)**2)*(Math.sin(x)**2);
        return R;
    }
    catch(err){
        window.alert('Chane number');
    }
    
}




//plot line chart
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
            21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,
        46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,
        73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90],
        //labels: [x_axis],
    
        datasets: [{
            label: 'Gas',
            data: [total_r_gas],
            //data:[0.001,0.012,0.003,0.009,0.004],
            fill: false,
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            borderColor: 'rgba(255, 0, 0, 0.5)'
            
         
        }, {
            label: 'Water',
            fill: false,
            backgroundColor: 'rgba(51, 119, 255, 0.8)',
            borderColor: 'rgba(51, 119, 255, 0.5)',
            data: [total_r_water]

        }, {
            label: 'Oil',
            fill: false,
            data: [total_r_oil],
            backgroundColor: 'rgba(0, 230, 77, 0.8)',
            borderColor: 'rgba(0, 230, 77, 0.8)'
        }]
    },
    options: {
        
        scales:{
            xAxes:[{
                scaleLabel:{
                    display:true,
                    labelString: 'Incidence Angle (Degrees)'
                },
                ticks:{
                    maxTicksLimit: 10
                }
            }],
            yAxes:[{
                scaleLabel:{
                    display:true,
                    labelString: 'Reflection'
                },
                ticks:{
                    maxTicksLimit: 5,
                    
                  
                }
            }]
        }
    }
});





