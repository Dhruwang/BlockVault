

export default function SendHistoryDocBox({
    toAddress,docName
}:{
    toAddress: string,
    docName: string
}) {
  return (
    <div className='sendHistoryDocBoxOuter'>
        <p>To : {toAddress}</p>
        <p>{docName}</p>
    </div>
  )
}
