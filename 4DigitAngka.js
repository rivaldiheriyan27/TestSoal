
function terbilang(x){
    let satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    let belasan = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    let puluhan = ['', 'sepuluh', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];
    console.log(x)

    if(x < 10){
        return satuan[x]
    } else if( x < 20){
        return belasan[x-10]
    } else if(x < 100){
        return puluhan[Math.floor(x/10)] + " " + satuan[ x % 10]
    } else if(x < 1000){
        return satuan[Math.floor(x /100)] + " ratus " + terbilang(x % 100)
    } else if( x < 1000000 ){
        return terbilang(Math.floor(x / 1000)) + " ribu " + terbilang(x % 1000)
    } else {
        return "Program Hanya bisa hingga jutaan"
    }
}



let x = 2234;
console.log(terbilang(x))