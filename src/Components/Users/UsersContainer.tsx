import {connect} from "react-redux";
import {RootState} from "../../Redux/store";
import {
    follow, followingInProgress,
    setCurrentPage, setLoadingStatus,
    setTotalCount,
    setUsers, getUsersThunk,
    unfollow, PageChangedThunk, UnfollowUserThunk, FollowUserThunk
} from "../../Redux/usersReducer";
import UsersClassContainer from "./UsersClassContainer";
import {compose} from "redux";
import React from "react";
import withAuthRedirect from "../hoc/AuthRedirect";

const mapAuthRedirect = (state:RootState) => {
    return{isAuth:state.auth.isAuth}}

const mapStateToProps = (state:RootState) => {
    return{
        users:state.usersPage.users,
        totalCount: state.usersPage.totalCount,
        count: state.usersPage.count,
        currentPage:state.usersPage.currentPage,
        isLoading:state.usersPage.isLoading,
        followingInProgressStatus:state.usersPage.followingInProgressStatus,
        //users это обьект ДАТА с вложенным массивом АЙТЕМС
    }
}

const mapDispatchToProps = {follow,unfollow,setUsers,setCurrentPage,
    setTotalCount,setLoadingStatus,followingInProgress,getUsersThunk,
    PageChangedThunk,UnfollowUserThunk,FollowUserThunk}

export type mapAuthRedirectToPropsType = ReturnType<typeof mapAuthRedirect>
export type mapStateToPropsType = ReturnType<typeof mapStateToProps>
export type mapDispatchToPropsType = typeof mapDispatchToProps
export type combineType = mapStateToPropsType & mapDispatchToPropsType


let AuthRedirectComponent = withAuthRedirect(UsersClassContainer)
AuthRedirectComponent = connect(mapAuthRedirect)(AuthRedirectComponent)


export default compose<React.FC>(connect(mapStateToProps,mapDispatchToProps))(AuthRedirectComponent)
    //сокращённо и приавильно mapDispatchToProps нужно писать вот так
    // приставка AC не используетс в проектах, поэтому её нуэно удалить