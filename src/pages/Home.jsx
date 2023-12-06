import React from 'react';
import '../home.css';
// import SectionVideos from '../components/SectionVideos';

export default function Home() {
	return (
		<div className='main-info'>
			<storng className='label-main'>
				내가 좋아하는 채널과 영상을 내맘대로{' '}
			</storng>

			<div className='wrap-box'>
				<div className='ui-box'>
					<div className='box-info type-box01'>
						원하는 분류대로
						<br /> 모아 보관
					</div>
				</div>
				<div className='ui-box'>
					<div className='box-info type-box02'>
						좋아하는 채널은 <br />
						최신 영상으로
					</div>
				</div>
				<div className='ui-box'>
					<div className='box-info type-box03'>
						늘 돌려보는 영상은 <br />
						메인 화면에 뙇
					</div>
				</div>

				<div className='ui-box'>
					<div className='box-info type-box04'>
						여러번의 클릭이
						<br /> 필요없다
						<br />
						한눈에 보는 <br />
						나의 영상 생활!
					</div>
				</div>
			</div>
		</div>
	);
}
