import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NotesControllerService} from "../../../../services/services/notes-controller.service";
import {NotesResponse} from "../../../../services/models/notes-response";
import {NotesRequest} from "../../../../services/models/notes-request";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges{

  @Input() exerciseId: number | undefined;

  notes: NotesResponse[] =[];

  isChecked: boolean = false;
  noteContent: string = '';

  constructor(
    private notesService: NotesControllerService
  ) {
  }

  // TODO: notatki nie zmieniają się po zmianie ćwiczenia lul
  ngOnChanges(changes: SimpleChanges): void {
    this.getAllNotes();
  }


  private getAllNotes(){
    this.notesService.findAllNotes().subscribe({
      next: (res) => {
        this.notes = res;
      }
    })
  }


  deleteNote(i: number | undefined) {
    if(i){
      this.notesService.deleteNotes({
        id: i
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })
    }
  }

  addNote() {
    this.isChecked = !this.isChecked;
  }

  createNote() {
    if(this.noteContent.length > 0){
      const noteRequest: NotesRequest = {
        exerciseId: this.exerciseId as number,
        note: this.noteContent
      }
      this.notesService.saveNotes({
        body: noteRequest
      }).subscribe({
        next: () => {
          window.location.reload();
        }
      })
    }
  }
}
