import React, { useState } from 'react'
import {Box,Button,useNotice,Text, BasePropertyProps,Label ,Icon, DropDown, DropDownTrigger, DropDownMenu, DropDownItem} from 'admin-bro'
import Axios from 'axios';


const BookingActions = (props: BasePropertyProps) => {
	  const {  property,record, onChange } = props
	
	const sendNotice=useNotice()
	const statusChange=(update)=>{
	console.log(sendNotice);
		const data={
			bookingId:record.params._id,
			update,
		}
	  	const request=Axios.post('/api/booking/setstatus',data)
			.then((res)=>{
					if(res.data.success){
					//pass
					if(update.status != "Cancelled"){
					sendNotice({message:update.status,type:'success'})
					}
					}
					setTimeout(()=>{window.location.reload();},5000);
					})
	
	}
	const onCancel =()=>{
		const data ={
			orderId:record.params.orderId,
			userId:record.params.bookedByUserId,
			txnId:record.params.paymentId,
			refundAmount:record.params.price * record.params.quantity,
		}
		const result=confirm("Want to Cancel Booking?\nIt will sent refund request automatically!!!");		
		if(result){
			const request=Axios.post('/api/refund/send',data)
				.then((res)=>{
						const extra ={refId:res.data.resData.refIdByApp,status:"Cancelled"}
					console.log(res.data);
					if(res.data.success){
						var refData=res.data.resData;
					var msgType = refData.resultInfo.resultCode =='10'?"success":'error';	
						sendNotice({message:<div>
								<pre>Booking Status       : Cancelled </pre>
								<pre>Refund Status        : {refData.resultInfo.resultStatus}</pre>
								<pre>Message              : {refData.resultInfo.resultMsg}</pre>
								<pre>Refund ID by Paytm   : {refData.refIdByPaytm?refData.refIdByPaytm:"Refer Paytm"}</pre>
								<pre>Our Refund ID        : {refData.refIdByApp?refData.refIdByApp:"See Booking Table"}</pre>
								<pre>Refund Amount        : {refData.refAmount?refData.refAmount:"Refer Paytm"}</pre>
								</div>,type:msgType})
						}else{
							sendNotice({message:"Some Error Occur",type:'error'});
						}
			
						statusChange(extra);
						
						})
		}
	
	}
	
	const refundStatus =()=>{
		const 	data ={
				orderId:record.params.orderId,
				refId:record.params.refId,
			}	
		const request= Axios.post('/api/refund/status',data)
			.then((res)=>{	var msg=""
					if(res.data.success){
						var refData=res.data.resData;
						console.log(refData)
						msg +=<p>Refund Status : {refData.resultInfo.resultStatus}</p>
						
						var msgType =refData.resultInfo.resultCode=='10'?'success':'error'
						sendNotice({message:<div>
								<pre>Refund Status        : {refData.resultInfo.resultStatus}</pre>
								<pre>Message              : {refData.resultInfo.resultMsg}</pre>
								<pre>Refund ID from Paytm : {refData.refIdByPaytm?refData.refIdByPaytm:"Refer Paytm"}</pre>
								<pre>Refund Amount        : {refData.refAmount?refData.refAmount:"Refer Paytm"}</pre>
								</div>,type:msgType})
						}else{
							sendNotice({message:"Some Error Occur",type:'error'});
						}
			

					})
	}
	function addToolTip(buttonComponent,msg){
		return(	<DropDown>
			<DropDownTrigger p="0px">
				{buttonComponent}
			</DropDownTrigger>
			<DropDownMenu left='xl'>	
			<DropDownItem p='default' >
				<Text textAlign='center' >{msg}</Text>
			</DropDownItem>
			</DropDownMenu>
		</DropDown>	)
	
	
	}
	const complete={
			"Cancelled":addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{refundStatus()}} 	><Icon icon="Money" /></Button>,"Check Refund Status"),	
	  		
			"Booked":<div>
				
				{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{statusChange({status:"Order Complete"})}} ><Icon icon="Task" /></Button>,"Complete the Order")}
				{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{onCancel()}}><Icon icon="NoTicket" /></Button>,"Cancel Booking")}
				
				</div>, 
	  		
					
			"Order Complete": addToolTip(<Button rounded size="icon" mr="default" onClick={()=>sendNotice({message:'Order Complete',type:'success'})}  > <Icon icon="Badge" /></Button>,"Order Complete"),	  
	  		
			"Cancellation":<div>
			
					{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{onCancel()}} > <Icon icon="Checkmark" />  </Button>,"Cancel Booking.")}
		 
					{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{statusChange({status:"Cancellation Declined"})}}   >  <Icon icon="Close" /> </Button>,"Decline Cancellation")}
					</div>,

	
			"Cancellation Declined":<div>
			
				{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{statusChange({status:"Order Complete"})}}>
				<Icon icon="Task" />
				</Button>,"Complete the Order")}

				{addToolTip(<Button rounded size="icon" mr="default" onClick={()=>{onCancel()} }>
				<Icon icon="NoTicket" />
				</Button>,"Cancel Booking")}</div>, 

	}
	
	  return (   
			 <div>
		
		        <Box>
			{complete[record.params.status]}
			</Box>
			<br />
			</div>
		    )
}
export default BookingActions
