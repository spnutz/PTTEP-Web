var ctx = document.getElementById('myChart');

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
    
    document.getElementById("poisson1").innerHTML = "Poisson1 : " + poisson1;
    document.getElementById("vp_vs1").innerHTML = "Vp/Vs1 : " + Vp_Vs1;
    document.getElementById("zp1").innerHTML = "Zp1 : " + zp1;

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
    
    document.getElementById("poisson1_water").innerHTML = "Poisson1 : " + poisson1_water;
    document.getElementById("vp_vs1_water").innerHTML = "Vp/Vs1 : " + Vp_Vs1_water;
    document.getElementById("zp1_water").innerHTML = "Zp1 : " + zp1_water;

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
    
    document.getElementById("poisson1_oil").innerHTML = "Poisson1 : " + poisson1_oil;
    document.getElementById("vp_vs1_oil").innerHTML = "Vp/Vs1 : " + Vp_Vs1_oil;
    document.getElementById("zp1_oil").innerHTML = "Zp1 : " + zp1_oil;
    

   // Reflection
   let pi = Math.PI;
   let x_axis = [];
   var i = 0;
   total_r_gas = [] // clear array
   total_r_water = []
   total_r_oil = []
   for(i=0;i <= 90;i++){
       let x = Number((i*pi)/180) ;
       let r = reflection(p_wave1, d1, p_wave2, d2, poisson1, poisson2, x);
       let r_water = reflection(p_wave1_water, d1, p_wave2_water, d2_water, poisson1_water, poisson2_water, x);
       let r_oil = reflection(p_wave1_oil, d1_oil, p_wave2_oil, d2_oil, poisson1_oil, poisson2_oil, x);
       total_r_gas.push(r);
       total_r_water.push(r_water);
       total_r_oil.push(r_oil);
       x_axis.push(x);
   }
   //// show reflection
   document.getElementById("rp").innerHTML = "Rp : " + total_r_gas[0];
   document.getElementById("rp_water").innerHTML = "Rp : " + total_r_water[0];
   document.getElementById("rp_oil").innerHTML = "Rp : " + total_r_oil[0];
  


    
    //myLineChart.data.datasets[0].data[0] = input;
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




//plot
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0,10,20,30,40,50,60,70,80,90],
        datasets: [{
            label: 'Gas',
            data: [total_r_gas],
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
            yAxes:[{
                ticks:{
                    maxTicksLimit: 5
                    
                    //Min: total_r[0],
                    //Max: total_r[90]
                }
            }]
        }
    }
});



