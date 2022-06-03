import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'blog-details/:slug',
    loadChildren: () => import('./pages/blog-details/blog-details.module').then(m => m.BlogDetailsModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./pages/client-profile/client-profile.module').then(m => m.ClientProfileModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)
  },
  {
    path: 'contract/:slug',
    loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'service/:slug',
    loadChildren: () => import('./pages/service-details/service-details.module').then(m => m.ServiceDetailsModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: 'opportunity',
    loadChildren: () => import('./pages/oppurtunity/oppurtunity.module').then(m => m.OppurtunityModule)
  },
  {
    path: 'opportunity-details/:slug',
    loadChildren: () => import('./pages/oppurtunity-details/oppurtunity-details.module').then(m => m.OppurtunityDetailsModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./pages/search-result/search-result.module').then(m => m.SearchResultModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule)
  },
  {
    path: 'submit-proposal',
    loadChildren: () => import('./pages/submit-proposal/submit-proposal.module').then(m => m.SubmitProposalModule)
  },
  {
    path: 'send-proposals/:slug',
    loadChildren: () => import('./pages/submit-proposal/submit-proposal.module').then(m => m.SubmitProposalModule)
  },
  {
    path: 'user-create-solution',
    loadChildren: () => import('./pages/user-create-solution/user-create-solution.module').then(m => m.UserCreateSolutionModule)
  },
  {
    path: 'job-post',
    loadChildren: () => import('./pages/job-post-page/job-post-page.module').then(m => m.JobPostPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
  },
  {
    path: 'project-details/:slug',
    loadChildren: () => import('./pages/project-details/project-details.module').then(m => m.ProjectDetailsModule)
  },
  {
    path: 'service-search',
    loadChildren: () => import('./pages/service-search/service-search.module').then(m => m.ServiceSearchModule)
  },
  {
    path: 'my-posts',
    loadChildren: () => import('./pages/my-post/my-post.module').then(m => m.MyPostModule)
  },
  {
    path: 'my-post-details/:id',
    loadChildren: () => import('./pages/my-post-details/my-post-details.module').then(m => m.MyPostDetailsModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'estimates',
    loadChildren: () => import('./pages/estimates/estimates.module').then(m => m.EstimatesModule)
  },
  {
    path: 'estimates/:slug',
    loadChildren: () => import('./pages/estimates/estimates.module').then(m => m.EstimatesModule)
  },
  {
    path: 'create-estimates',
    loadChildren: () => import('./pages/create-estimates/create-estimates.module').then(m => m.CreateEstimatesModule)
  },
  {
    path: 'estimator',
    loadChildren: () => import('./pages/estimator/estimator.module').then(m => m.EstimatorModule)
  },
  {
    path: 'project-status',
    loadChildren: () => import('./pages/project-status/project-status.module').then(m => m.ProjectStatusModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpModule)
  },
  {
    path: 'privious-work',
    loadChildren: () => import('./pages/privious-work/privious-work.module').then(m => m.PriviousWorkModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
