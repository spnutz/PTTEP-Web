var ctx = document.getElementById('myChart');

var total_r = [] ;
function adddata(){
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

    //let Rp = reflection(p_wave1, d1, p_wave2, d2, poisson1, poisson2, 0);

    
    document.getElementById("poisson1").innerHTML = "Poisson1 : " + poisson1;
    document.getElementById("vp_vs1").innerHTML = "Vp/Vs1 : " + Vp_Vs1;
    document.getElementById("zp1").innerHTML = "Zp1 : " + zp1;
    

   // Reflection
   let pi = Math.PI;
   let x_axis = [];
   var i = 0;
   total_r = [] // clear array
   for(i=0;i <= 90;i++){
       let x = Number((i*pi)/180) ;
       let r = reflection(p_wave1, d1, p_wave2, d2, poisson1, poisson2, x);
       total_r.push(r);
       x_axis.push(x);
   }
   document.getElementById("rp").innerHTML = "Rp : " + total_r[0];
   console.log(total_r[90]);


    
    //myLineChart.data.datasets[0].data[0] = input;
    myLineChart.data.datasets[0].data = total_r;
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
            label: 'DHS',
            data: [total_r],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ]      
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

console.log(total_r[90]);

