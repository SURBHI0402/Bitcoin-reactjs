import {useState} from "react";
import axios from "axios";


function Btc(){


	const[currency,setCurrency]=useState("usd");
	const[ans,setAns]=useState("");
	const[ans1,setAns1]=useState("");
	
	const hCurrency=(event)=>{setCurrency(event.target.value);}


	const find=(event)=>{
	
	event.preventDefault();
	let urladd="https://api.coindesk.com/v1/bpi/currentprice.json";
	axios.get(urladd)
	.then(res=>{
		let msg="";
		if(currency=="usd")
			msg=res.data.bpi.USD.rate;
		else if(currency=="gbp")
			msg=res.data.bpi.GBP.rate;
		else
			msg=res.data.bpi.EUR.rate;
		setAns(msg);
		console.log(currency);


		let newurladd="https://api.exchangerate-api.com/v4/latest/"+currency.toUpperCase();
		console.log(newurladd);
		axios.get(newurladd)
		.then(res=>{
		let value=parseFloat(res.data.rates.INR);
		msg=msg.replace(",","");
		let a=parseFloat(msg);
		console.log(value);
		console.log(a);
		let result=value * a;
		setAns1(result);
		

		})

		.catch(err=>setAns1("issue"+err));
	
	})

	.catch(err=>setAns("issue"+err));



	}

return(

	<>
	<div>
	<h1>Bitcoin Value Finder</h1>
	
	<form onSubmit={find}>
		<input type="radio" name="c" value="usd" defaultChecked={true} onChange={hCurrency}/>USD
		<br/><br/>
		<input type="radio" name="c" value="gbp" onChange={hCurrency}/>GBP
		<br/><br/>
		<input type="radio" name="c" value="eur"onChange={hCurrency} />EUR
		<br/><br/>
		<input type="submit" value="Find Rate" className="button"/>
	</form>
	
	<h1>Bticoin value: { ans }</h1>
	<h1>Bitcoin value in Rupess: { ans1 }</h1>
		
	</div>

	</>



);



}
export default Btc;