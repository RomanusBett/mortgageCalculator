document.addEventListener("DOMContentLoaded", ()=>{
    const rangeInputs = document.querySelectorAll("input[type='range']");
    rangeInputs.forEach((input)=>{
        input.addEventListener('input', e=>{
            let value = (e.target.value - e.target.min) / (e.target.max - e.target.min)*100;
            e.target.style.background = `linear-gradient(to right, rgb(140, 86, 255) ${value}%, white ${value}%)`
        });
        let value = (input.value - input.min) / (input.max - input.min) * 100;
        input.style.background = `linear-gradient(to right, rgb(140, 86, 255) ${value}%, white ${value}%)`;
    });
});

let purchase = 0;
let downPay = 0;
let interestAmount = 0;
let repaymentPeriod = 1;


const getPurchase = document.getElementById('purchaseInput');
const getDownPayment = document.getElementById('downInput');
const loanAmountBox = document.getElementById('loanAmountBox');
const getInterest = document.getElementById('interestAmount');
const getRepaymentPeriod = document.getElementById('repaymentPeriod');
const perMonthBox = document.getElementById('perMonthBox');

const calculateLoanAmount = () => {
    if (isNaN(purchase) || isNaN(downPay) || isNaN(interestAmount) || isNaN(repaymentPeriod) || repaymentPeriod <= 0) {
        loanAmountBox.innerText = `$0`;
        return;
    }

    const loanAmount = purchase - downPay;
    let mortgagePayment = 0;
    if (interestAmount > 0) {
        mortgagePayment = loanAmount * 
            ((interestAmount * Math.pow(1 + interestAmount, repaymentPeriod)) / 
            (Math.pow(1 + interestAmount, repaymentPeriod) - 1));
    } else {
        mortgagePayment = loanAmount / repaymentPeriod; 
    }

    loanAmountBox.innerText = `$${loanAmount.toLocaleString()}`;
    perMonthBox.innerText = `$${(Math.round(mortgagePayment/144)).toLocaleString()}`


};

getPurchase.addEventListener('input', e=>{
    purchase = parseInt(e.target.value);
    calculateLoanAmount();
});

getDownPayment.addEventListener('input', e=>{
    downPay = parseInt(e.target.value);
    calculateLoanAmount();
});
getInterest.addEventListener('input', e=>{
    interestAmount = parseInt(e.target.value);    
    calculateLoanAmount();
})

getRepaymentPeriod.addEventListener('input', e=>{
    repaymentPeriod = e.target.value;        
    calculateLoanAmount();
})