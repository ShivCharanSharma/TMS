import React , { useEffect, useState }from 'react'
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import {Table,Button,Tooltip,Icon,Modal,Result,Spin} from 'antd';

//import {getBookingHistory} from '../../../_actions/user_actions';
function BookingHistory(props) {
	const dispatch = useDispatch();
	const [Bookings,setBookings] = useState([]);
	const [BookingSize,setBookingSize] = useState(0);
	const [ShowModal,setShowModal]= useState(false);
	const [ShowModalMsg,setShowModalMsg]= useState({});
	const [Loading,setLoading]=useState(true)
	function getBookingHistory() {
   	const request = Axios.post(`/api/booking/getBookings`)
        .then(response => {
	   	
                
		response.data.bookings.forEach((booking,i)=>{  
			response.data.bookings[i].key= i;
			response.data.bookings[i].bookingDate=booking.bookingDate.substring(0,10);
		});
                setBookings(response.data.bookings);
		setBookingSize(response.data.bookingsSize);
		setLoading(false);
        });	
	}
	useEffect(()=>{
		
		getBookingHistory();
		
	},[]);

	function renderButton(record){
	
	

	const buttonType={
		"Booked"		:<Tooltip title="Request to cancel booking">
						<Button type="primary" shape="circle" onClick={()=>{requestCancelBooking(record._id)}} ><Icon type="close" /></Button>
					</Tooltip>,

		"Cancellation"		:<Tooltip title="Check Cancellation Status">
						<Button type="primary" shape="circle" onClick={()=>{renderMessage(record)}} ><Icon type="eye" /></Button>
					</Tooltip>,
		
		"Cancelled"  		:<Tooltip title="Check Refund Status">
						<Button type="primary" shape="circle" onClick={()=>{ refundStatus(record) }} ><Icon type="monitor" /></Button>
					</Tooltip>,
		
		"Order Complete"	:<Tooltip title="Thanks for choosing us">
						<Button type="primary" shape="circle" onClick={()=>{renderMessage(record)}} ><Icon type="smile" /></Button>
					</Tooltip>,

		"Cancellation Declined"	:<Tooltip title="Check Cancellation Status">
						<Button type="primary" shape="circle" onClick={()=>{renderMessage(record)}} ><Icon type="eye" /></Button>
					</Tooltip>,

	
	}
	return buttonType[record.status]
	}
	const onCancelModal=()=>{
		setShowModal(false);
	}
	const renderModal=()=>{
		console.log(ShowModalMsg);
	return(
		<Modal
          	title=""
        	visible={ShowModal}
          	//onOk={this.handleOk}
          	onCancel={()=>{onCancelModal()}}
		footer={[]}
        	>
		{ShowModalMsg.message}
 	       </Modal>
 		)
	}

	function  renderMessage(record){
		var msg={}
		 msg= {"Order Complete":<Result
		    icon={<Icon type="smile" />}
		    title="Thank you for choosing us :)"
		  />,
			 "Cancellation":<Result
		    icon={<Icon type="history" />}
		    title="We are processing your request."
		    extra={"please wait for 1-2 days :)"}
		  />,

		 "Cancellation Declined":<Result
		    title="We are unable to accept your cancellation request, We apologise for it."
		    extra={"For More Information Contect Us :)"}
		  />,

		 
		 
		 }
		setShowModalMsg({message:msg[record.status]})
			setShowModal(true)
			renderModal()
	
	}
	 
	const requestCancelBooking=(bookingId)=>{
		const data={bookingId,
				update:{
				status:"Cancellation"					
				}				
			}
		
			console.log(data);
			const request = Axios.post(`/api/booking/setstatus`,data)
	        .then(response => {

			console.log("in Cancel");
			console.log(response);
			getBookingHistory();

			//setRenderTable(false);
	        	});	
	
	}
	 const refundStatus =(record)=>{
                const   data ={
                                orderId:record.orderId,
                                refId:record.refId,
                        }
                const request= Axios.post('/api/refund/status',data)
                        .then((res)=>{  var msg=""
					var showStatus={}
                                        if(res.data.success){
                                                var refData=res.data.resData;
                                                console.log(refData)

                                                var msgType =refData.resultInfo.resultCode=='10'?'success':'error'
                                                showStatus= {message:<div><h1>Refund Status</h1>
							<table><tbody>
							<tr style={{borderBottom:"1px solid black"}}>
                                                                <td>Refund Status</td>
								<td> {refData.resultInfo.resultStatus}</td>
							</tr>
							<tr  style={{borderBottom:"1px solid black"}}>
                                                                <td>Message</td>
								<td>  {refData.resultInfo.resultMsg}</td>
							</tr>
							<tr style={{borderBottom:"1px solid black"}}>
                                                                <td>Refund ID </td>
								<td>  {refData.refIdByPaytm?refData.refIdByPaytm:"Contect us"}</td>
							</tr>
							<tr style={{borderBottom:"1px solid black"}}>
                                                                <td>Refund Amount</td>
								<td>  {refData.refAmount?refData.refAmount:"Contect us"}</td>
                                                        </tr>
							</tbody></table>
							</div>,type:msgType}
                                                }else{
                                                       showStatus={message:"Some Error Occur",type:'error'}
                                                }

					setShowModal(true);
					setShowModalMsg(showStatus)
                                        })
		}

	const columns = [
		
		{
			title:"Package Title",
			dataIndex:'packageTitle',
			key:'packageTitle',
			//fixed :'left',
			//width:'400',
			
		},
		{
			title:"Order ID",
			dataIndex:'orderId',
			key:'orderId',
			//width:'30'
			
		},
		{
			title:"Price",
			dataIndex:'price',
			key:'price',
			//width:'20'
		},
		{
			title:"Quantity",
			dataIndex:'quantity',
			key:'quantity',
			//width:'16',
		},
		
		{
			title:"Date of Purchase",
			dataIndex:'bookingDate',
			key:'bookingDate',
			//width:'40',
		},
		
		{
			title:"Status",
			dataIndex:'status',
			key:'status',
			//fixed:'right',
			//width:'20',
		},
		{
			title:"Action",
			dataIndex:'',
			key:'x',
			 render: (text, record) => (
      				renderButton(record)
      				),
			//fixed:'right',
			//width:'20',
		},

	];
    return (
        <div style={{ width: '90%', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
	    	<hr style={{width:'75%',height:'2px', background:'black'}} />
	    	<br />
            </div>
	     {Loading?<div style={{display: 'flex', height: '300px', justifyContent: 'center',alignItems:"center"}} ><Spin tip="Loading..."/></div>
		     :
	   <div>
		{renderModal()}
		{<Table className="historyTable" columns={columns} 
			 expandable={{
     			 expandedRowRender: record => <p style={{ margin: 0 }}>{record.orderId}}</p>,
     
    }}		
dataSource={Bookings} 
		scroll={{x:900}}
		size="small" />}
	   </div>}
          </div>
    )
}

export default BookingHistory
