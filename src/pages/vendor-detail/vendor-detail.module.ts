import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorDetailPage } from './vendor-detail';

@NgModule({
  declarations: [
    VendorDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorDetailPage),
  ],
})
export class VendorDetailPageModule {}
