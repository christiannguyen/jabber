import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

const JobPostingWrapper = styled.div`
	border-radius: 5px;
	width: 40%;
	padding: 15px;
	margin-left: 15px;
	margin-right: 15px;
	margin-bottom: 20px;
	box-shadow: 0 15px 35px 0 rgba(42, 51, 83, 0.12), 0 5px 15px rgba(0, 0, 0, 0.06);
`;
const TopSection = styled.div`
	display: flex;
	margin-bottom: 40px;
`;
const BottomSection = styled.div``;
const LeftSide = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
`;
const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
	text-align: right;
`;

const SecondaryText = styled.span`
	color: #999999;
	font-size: 14px;
`;

const LinkedInText = styled.a`
	display: block;
	color: #8aa0f6;
	margin-top: 25px;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const Title = styled.a`
	color: #5978f3;
	font-weight: 600;
	text-decoration: none;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;
const Company = styled(SecondaryText)``;
const Location = styled.span`
	font-size: 14px;
`;
const Date = styled(SecondaryText)``;

function JobPosting({ company, date, url, location, title, description }) {
	const strippedDescription = description.replace(/(<([^>]+)>)/gi, '');
	return (
		<JobPostingWrapper>
			<TopSection>
				<LeftSide>
					<Title target="_blank" rel="noopener noreferrer" href={url}>
						{title}
					</Title>
					<Company>{company}</Company>
				</LeftSide>
				<RightSide>
					<Location>{location}</Location>
					<Date>{moment(date).format('MMM Do YYYY')}</Date>
				</RightSide>
			</TopSection>
			<BottomSection>
				<span>{strippedDescription}</span>
				<LinkedInText
					target="_blank"
					rel="noopener noreferrer"
					href={`https://www.linkedin.com/search/results/all/?keywords=recruiter%20at%20${company}&origin=GLOBAL_SEARCH_HEADER`}
				>
					Recruiter Search
				</LinkedInText>
			</BottomSection>
		</JobPostingWrapper>
	);
}

JobPosting.propTypes = {
	jobDetails: PropTypes.object,
};

JobPosting.defaultProps = {
	company: 'company',
	date: 'date',
	url: 'url',
	location: 'location',
	title: 'title',
	description: 'descript',
};

export default JobPosting;
