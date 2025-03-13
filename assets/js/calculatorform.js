function formatNumber(number) {
    return Number(number).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

$(document).ready(function(){
    $('#calculatorform').submit(function(e){
        e.preventDefault();
        const calculatorform = document.getElementById('calculatorform');
        if (calculatorform.checkValidity()){
            let daily_trade_rounds = Number($('#daily-trade-rounds').val());
            let trade_round_days = Number($('#trade-round-days').val());
            let trade_round_golfers = Number($('#trade-round-golfers').val());
            let months_open = Number($('#months-open').val());
            let green_fee = Number($('#green-fee').val());
            let cart_fee = Number($('#cart-fee').val());
            let weekly_trade_rounds = daily_trade_rounds * trade_round_days;
            let weekly_golfers = weekly_trade_rounds * trade_round_golfers;
            let monthly_rounds = weekly_golfers * (30 / 7);
            let annual_rounds = monthly_rounds * months_open;
            let total_fee = green_fee + cart_fee;
            let annual_cost = annual_rounds * total_fee;
            let easy_tee_cost = months_open * 200;
            let savings = annual_cost - easy_tee_cost;
            $('#annual-cost').text(formatNumber(annual_cost));
            $('#easy-tee-cost').text(formatNumber(easy_tee_cost));
            $('.savings').text(formatNumber(savings));
            $('#calculator-modal').modal("show");
        }
    })
})