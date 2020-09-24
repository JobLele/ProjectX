import React from "react"
import "./PP.css"
class PP extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values: {
                people : []
            },
            err: "",
            msg: ""
        }
    }
    render(){
    return(<div>
        <div className="container">
    <div className="row profile">
		<div classNameName="col-md-3">
			<div className="profile-sidebar">
				<div className="profile-userpic">
                <img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" className="img-responsive" alt=""/>
				</div>
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
						Marcus Doe
					</div>
					<div className="profile-usertitle-job">
						Kakke Da Dhabba
					</div>
				</div>
				<div className="profile-usermenu">
					<div>
							+91-23456789
                    </div>
					<div style={{"color":"gray"}}>
                        chotu@gmail.com
                        </div>	
				</div>
				<div className="profile-userbuttons">
					<button type="button" className="btn btn-dark btn-sm">Edit Profile</button>
				</div>
			</div>
		</div>
		<div className="col-md-9">
            <div className="profile-content">
			   <h3><strong>JOBS POSTED</strong></h3>
               <div>
                   <ul>
                       <li>
                           <h6>JOB TITLE</h6>
                           <div>
                           <span>Start date
                           </span>
                           <span>
                               End Date
                           </span>
                           </div>
                            <div>
                                Salary
                            </div>
                           <div>
                               Description,,,,,, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia "
                           </div>
                           <div></div>
                       </li>
                   </ul>
               </div>
               <div>
               <h3><strong>JOBS Applied</strong></h3>
               <div>
                   <ul>
                       <li>
                           <h6>JOB TITLE</h6>
                           <div>
                           <span>Start date
                           </span>
                           <span>
                               End Date
                           </span>
                           </div>
                            <div>
                                Salary
                            </div>
                           <div>
                               Description,,,,,, "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia"
                           </div>
                           <div></div>
                       </li>
                   </ul>
               </div>
               </div>
            </div>
		</div>
	</div>
</div>
<center>
<strong>Powered by <a href="http://j.mp/metronictheme" target="_blank">KeenThemes</a></strong>
</center>
<br/>
<br/>
</div>
    );
}
    

}
export default PP;