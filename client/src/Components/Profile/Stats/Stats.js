import './stats.scss'

const Stats = (params) => {
  const imgSize = '20vh'

  return (
    <div id='stats-cont' className='flex small-panel'>
      <div id='stats-img'>
        <img style={{width: imgSize, height: imgSize}} className="square-curved shadow-dark" src={params.data.photo} />
      </div>

      <div className='flex-col'>
        <div className=''>
          {params.data.name}
        </div>
        <div className=''>
          Software Engineer
        </div>
        <div className=''>
          Answered {params.data.answers.length} Question
        </div>
        <div className=''>
          Answered {params.data.selectedAnswersCount} Selected Question
        </div>
        <div className=''>
          Post {params.data.postsCount} Questions
        </div>
        <div className=''>
          Rating 4.5
        </div>
        

      </div>
    </div>
  )
}

export default Stats