import React from "react";

export default class Pagination extends React.Component {
	render() {
		return (
			<div id="pagination-section">
				<div className="pagination-content rounded-lg grid grid-cols-6">
					<div 
						className="pagination-content-item"
						onClick={() => {
							if (this.props.page.currentPage > 1) {
								this.props.pageAction(this.props.page.currentPage - 1)
							}
						}}
					>
						<img src="/images/svg/chevron-left.svg" alt=""/>
					</div>
					<div className="pagination-content-item col-span-4">
						{
							this.props.page.listPage.map((item, idx) => (
								<div 
									key={idx} 
									className={
										item == this.props.page.currentPage ?
										"pagination-content-number active" :
										"pagination-content-number"
									}
									onClick={() => {
										if (item != this.props.page.currentPage) this.props.pageAction(item);
									}}
								>
									<span>{item}</span>
								</div>
							))
						}
					</div>
					<div 
						className="pagination-content-item"
						onClick={() => {
							if (this.props.page.currentPage < this.props.page.maxPage) {
								this.props.pageAction(this.props.page.currentPage + 1)
							}
						}}
					>
						<img src="/images/svg/chevron-right.svg" alt=""/>
					</div>
				</div>
			</div>
		);
	}
}
