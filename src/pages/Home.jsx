import React from 'react';
import '../home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const navigate = useNavigate();

	return (
		<div className='main-info '>
			<div className='info-det'>
				<strong>가볍게 즐기는 나만의 유튜브</strong>
				최신뉴스, 매일 보는 홈트
				<br />
				취업을 위한 공부까지
				<br />
				한눈에, 편하게, 알고리즘 없이 즐겨보세요.
			</div>
			<strong className='label-main'>
				내가 좋아하는 채널과 영상을 내맘대로{' '}
			</strong>

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
			<strong className='label-main type-start'>지금, 시작해보세요</strong>

			<div class='ui-buttons'>
				<button type='button' onClick={() => navigate('/auth/sign_up')}>
					회원가입
				</button>
			</div>
		</div>
	);
}
