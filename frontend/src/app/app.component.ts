import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'charts-task';
  someData = '';

  constructor(private http: HttpClient) {
  }

  upload(event) {
    let uploadedFiles = event.target.files;
    let formData = new FormData();
    for (var i = 0; i < uploadedFiles.length; i++) {
        formData.append("uploads[]", uploadedFiles[i], uploadedFiles[i].name);
    }
    this.http.post('/api/upload', formData)
    .subscribe((response) => {
       this.someData = JSON.stringify(response.entry, null, 2)
    })
  }
}
