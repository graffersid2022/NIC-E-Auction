import React from 'react'
import RESOURCE from '../config/resource'

export default function AuctionInfo({auctiondata}) {
  return (
    <div className="auction-details white-panel">
        <div className="auction">
            <div className="auction-id-label">{RESOURCE.DESCRIPTION}</div>
            <div className="auction-no">{auctiondata?.pr_subject}</div>
        </div>
        <div className="project">
           {auctiondata?.pr_number? <div><div className="pr-number">{RESOURCE.PR_NUMBER} </div> <div className="num"> {auctiondata?.pr_number}</div></div>:null }

          {auctiondata?.project_name?  <div><div className="pr-number">{RESOURCE.PROJECT_NAME}</div>  <div className="num">{auctiondata?.project_name}</div></div>:null }

          {auctiondata?.project_number?  <div><div className="pr-number">{RESOURCE.PROJECT_NUMBER}</div> <div className="num">{auctiondata?.project_number}</div></div>:null}
        </div>
    </div>
  )
}
