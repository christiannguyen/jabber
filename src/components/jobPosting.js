import React from 'react';
import styled from 'styled-components';

const JobPostingWrapper = styled.div`
	border: 1px solid black;
	width: 40%;
`;
const TopSection = styled.div`
	display: flex;
`;
const BottomSection = styled.div``;
const LeftSide = styled.div``;
const RightSide = styled.div`
	margin-left: auto;
`;

function JobPosting({ company, company_url, location, title, description }) {
	return (
		<JobPostingWrapper>
			<TopSection>
				<LeftSide>
					<p>title</p>
					<p>company</p>
				</LeftSide>
				<RightSide>
					<p>location</p>
					<p>posted</p>
				</RightSide>
			</TopSection>
			<BottomSection>
				<p>description</p>
				<div>
					<span>job posting</span>
					<span>recruiter linkedin</span>
				</div>
			</BottomSection>
		</JobPostingWrapper>
	);
}

export default JobPosting;
