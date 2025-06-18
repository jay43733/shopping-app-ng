import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}
  authSub: Subscription;
  isAuthenticate = false;

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((data) => {
      data ? (this.isAuthenticate = true) : (this.isAuthenticate = false);
      console.log(data);
    });
  }

  onSave() {
    this.dataStorageService.saveData();
  }

  onFetch() {
    this.dataStorageService.fetchData();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
