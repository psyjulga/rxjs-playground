import { Observable, 
         forkJoin, 
         from, 
         fromEvent, 
         interval, 
         timer, 
         of, 
         combineLatest, 
         filter, 
         map, 
         tap, 
         debounceTime, 
         catchError, 
         EMPTY, 
         concatMap, 
         Subject,
        BehaviorSubject, 
        withLatestFrom} from 'rxjs';
import { ajax } from "rxjs/ajax";

// const someObservable$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// someObservable$.subscribe(value => console.log(value));

// const observable$ = new Observable<string>( subscriber => {
//   console.log('Observable executed');
//   subscriber.next('Julia');
//   setTimeout(() => subscriber.next('Hicham'), 2000);
//   setTimeout(() => subscriber.next('Reda'), 4000);
// })

// const observer1 = {
//   next: (value: any) => console.log('OBSERVER 1', value)
// }

// const observer2 = {
//   next: (value: any) => console.log('OBSERVER 2', value)
// }

// const observer3 = {
//   next: (value: any) => console.log('OBSERVER 3', value)
// }

// // const subscription = observable$.subscribe(observer);

// console.log('Subscription 1 starts:');
// observable$.subscribe(observer1);

// setTimeout(() => {
//   console.log('Subscrition 2 starts: ')
//   observable$.subscribe(observer2);
// }, 1000);

// setTimeout(() => {
//   console.log('Subscrition 3 starts: ')
//   observable$.subscribe(observer3);
// }, 2000);

// setTimeout(() => {
//   console.log('Unsubscribing');
//   subscription.unsubscribe();
// }, 3000);

// const myObservable$ = new Observable<string>(subscriber => {
//   console.log('Observable executed');
//   subscriber.next('Alice');
//   // subscriber.complete();
//   setTimeout(() => {
//     subscriber.next('Alice 3');
//   }, 5000);
//   setTimeout(() => {
//     subscriber.error(new Error('Error'));
//   }, 4000);

//   // TEARDOWN LOGIC
//   return () => {
//     console.log('TEARDOWN');
//   }
// });

// const myObserver = {
//   next: (value:string) => console.log(value),
//   complete: () => console.log('Completed'),
//   error: (error: Error) => console.log(error.message),
// }

// console.log('Before subscribe');
// myObservable$.subscribe(myObserver);
// console.log('After subscribe');

// const interval$ = new Observable<number>( subscriber => {
//   let counter = 1;
  
//   const id = setInterval(() => {
//     console.log('Emitting: ', counter);
//    subscriber.next(counter++);
//   }, 2000);

//   return () => {
//     clearInterval(id);
//   }
// })

// const subscription = interval$.subscribe(counter => console.log(counter));

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 7000);


// ----- HOT and COLD OBSERVABLES -----

// COLD OBSERVABLE

// const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name');

// ajax$.subscribe(data => console.log('Sub 1', data.response.first_name));
// ajax$.subscribe(data => console.log('Sub 2', data.response.first_name));
// ajax$.subscribe(data => console.log('Sub 3', data.response.first_name));

// HOT OBSERVABLE

// const helloButton = document.querySelector('button#hello');

// const helloClick$ = new Observable<MouseEvent>(subscriber => {
//   helloButton.addEventListener('click', (event: MouseEvent) => {
//     subscriber.next(event);
//   });
// });

// console.log('Subscription 1 starts');
// helloClick$.subscribe(
//   event => console.log('Sub 1:', event.type, event.x, event.y)
// );

// setTimeout(() => {
//   console.log('Subscription 2 starts');
//   helloClick$.subscribe(
//     event => console.log('Sub 2:', event.type, event.x, event.y)
//   );
// }, 8000);


// ----- CREATION FUNCTIONS (operators) -----

// ----- OF -----

// of('A', 'B', 'C').subscribe({
//   next: (val: string) => console.log(val),
//   complete: () => console.log('completed'),
// });

// ourOwnOf('A', 'B', 'C').subscribe({
//   next: (val: string) => console.log(val),
//   complete: () => console.log('completed'),
// });

// const names$ = new Observable<string>( subscriber => {
//   subscriber.next('1');
//   subscriber.next('2');
//   subscriber.next('3');
//   subscriber.complete();
// });

// names$.subscribe({
//   next: (val: string) => console.log(val),
//   complete: () => console.log('completed'),
// });

// function ourOwnOf(...args: string[]): Observable<string> {
//   return new Observable<string>( subscriber => {
//     for (let i = 0; i < args.length; i++) {
//       subscriber.next(args[i]);
//     }
//     subscriber.complete();
//   })
// }

// ----- FROM -----

// from(['one', 'two', 'three']).subscribe({
//   next: (val: string) => console.log(val),
//   complete: () => console.log('completed'),
// });

// const somePromise = new Promise((resolve, reject) => {
//   resolve('Promise resolved');
//   // reject(new Error('Promise rejected'));
// });

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//   next: (val: string) => console.log(val),
//   error: ( error: Error ) => console.log(error.message),
//   complete: () => console.log('completed'),
// });

// ----- FROMEVENT -----

// const helloButton = document.querySelector('button#hello');

// const eventObservable$ = fromEvent(helloButton, 'click'); // addEventListener

// const subscription = eventObservable$.subscribe((event: MouseEvent) => console.log(event.type, event.x, event.y));

// const triggerClick$ = new Observable<MouseEvent>( subscriber => {
//  const clickHandler = (event: MouseEvent) => {
//   console.log('Event callback executed');
//   subscriber.next(event);
// };

// helloButton.addEventListener('click', clickHandler);

//   return () => {
//     helloButton.removeEventListener('click', clickHandler);
//   } 
// });

// const subscription = triggerClick$.subscribe((event)=> console.log(event.type, event.x, event.y))

// setTimeout(()=> {
//   console.log('Unsubscribe');
//   subscription.unsubscribe();
// }, 5000);

// ----- TIMER / INTERVAL -----

// const timer$ = new Observable<number>( subscriber => {
//   const id = setTimeout(() => {
//    console.log('Timeout');
//    subscriber.next(0);
//    subscriber.complete();
//   }, 2000);

//   return () => {
//     clearTimeout(id);
//   }
// });

// timer$.subscribe({
//   next: (val: number) => console.log(val),
//   complete: () => console.log('completed'),
// })

// const subscription = timer(2000).subscribe({
//   next: (val: number) => console.log(val),
//   complete: () => console.log('completed'),
// })

// const subscription = timer$.subscribe({
//     next: (val: number) => console.log(val),
//     complete: () => console.log('completed'),
//   });

// const subscription = interval(2000).subscribe({
//     next: (val: number) => console.log(val),
//     complete: () => console.log('completed'),
//   });

//   setTimeout(()=> {
//     console.log('Unsubscribe');
//     subscription.unsubscribe();
//   }, 7000);

// const interval$ = new Observable<number>( subscriber => {
//   let counter = 0;

//   const id = setInterval(() => {
//    console.log('Interval');
//    subscriber.next(counter++);
//   //  subscriber.complete(); => it never completes
//   }, 2000);

//   return () => {
//     clearInterval(id);
//   }
// });

// const subscription = interval$.subscribe({
//   next: (val: number) => console.log(val),
//   complete: () => console.log('completed'),
// });

//   setTimeout(()=> {
//     console.log('Unsubscribe');
//     subscription.unsubscribe();
//   }, 7000);

// ----- FORKJOIN -----
// => waits till all observables have completed and emits a set of the latest values

// const randomName$ = ajax<any>('https://random-data-api.com/api/name/random_name');
// const randomNation$ = ajax<any>('https://random-data-api.com/api/nation/random_nation');
// const randomFood$ = ajax<any>('https://random-data-api.com/api/food/random_food');

// randomName$.subscribe( res => console.log('Name: ', res.response.first_name));
// randomNation$.subscribe( res => console.log('Capital: ', res.response.capital));
// randomFood$.subscribe( res => console.log('Food: ', res.response.dish));

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([name, capital, food]) => console.log(
//     `${name.response.first_name} lives in ${capital.response.capital} and likes to eat ${food.response.dish}.`
//     )
//   )

// ERROR

const a$ = new Observable( subscriber => {
  setTimeout(() => {
    subscriber.next('A');
    subscriber.complete();
  }, 6000);

  return () => {
    console.log('A Teardown'); // will run instantly, when B fails
  }
});

const b$ = new Observable( subscriber => {
  setTimeout(() => {
    subscriber.error('Failure!');
  }, 2000);

  return () => {
    console.log('B Teardown');
  }
});

// forkJoin([a$, b$]).subscribe({
//   next: value => console.log('Success: ', value),
//   error: error => console.log('Error: ', error),
// });

// ----- COMBINELATEST -----
// emits a set of the latest values first when each observable has emitted a value,
// emits a new set of the latest values each time one of the observables emits a new value 

const temperatureInput = document.getElementById('temperature-input');
const conversionDropdown = document.getElementById('conversion-dropdown');
const resultText = document.getElementById('result-text');

const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
const conversionnputEvent$ = fromEvent(conversionDropdown, 'input');

combineLatest([temperatureInputEvent$, conversionnputEvent$]).subscribe(
  ([ temp, conv ]) => {
    const temperature = Number(temp.target['value' as keyof EventTarget]);
    const conversion = String(conv.target['value' as keyof EventTarget]);

    let result: number;

    if ( conversion === 'f-to-c') {
      result = (temperature -32) * 5/9;
    } else if ( conversion === 'c-to-f') {
      result = temperature * 9/5 +32
    }

    resultText.innerText = String(result);
  }
);


// ----- PIPEABLE OPERATORS -----

// ----- FILTER -----

interface NewsItem {
  category: 'Business' | 'Sports';
  content: string;
}

const newsFeed$ = new Observable<NewsItem>( subscriber => {
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'A' });
  }, 2000);
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'B' });
  }, 3000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', content: 'C' });
  }, 4000);
  setTimeout(() => {
    subscriber.next({ category: 'Sports', content: 'D' });
  }, 5000);
  setTimeout(() => {
    subscriber.next({ category: 'Business', content: 'E' });
  }, 6000);
});

const sportsNewsFeed$ = newsFeed$.pipe(
  filter( item => item.category === 'Sports'),
);

const businessNewsFeed$ = newsFeed$.pipe(
  filter( item => item.category === 'Business'),
);

// newsFeed$.subscribe((item) => console.log(item));
// sportsNewsFeed$.subscribe((item) => console.log(item));
// businessNewsFeed$.subscribe((item) => console.log(item));

// ----- MAP -----

const randomFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
  map(res => res.response.first_name),
);
const randomCapital$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
  map(res => res.response.capital),
);
const randomDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
  map(res => res.response.dish),
);

// forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
//   ([name, capital, dish]) => console.log(
//     `${name} lives in ${capital} and likes to eat ${dish}.`
//     )
//   )

// ----- TAP -----
// does not effect notifications (values)
// will just perform side effects

// of(1, 7, 3, 6, 2).pipe(
//   tap(value => console.log('Spy: ', value)),
//   filter(value => value > 5),
//   tap(value => console.log('Spy after filter: ', value)),
//   map(value => value*2),
//   tap({
//     next: value => console.log('Spy after map: ', value),
//     error: error => console.log('Error: ', error),
//     complete: () => console.log('Complete'),
//   }),
// ).subscribe(value => console.log('Output: ', value));

// ----- DEBOUNCETIME -----

const sliderInput = document.querySelector('input#slider');

fromEvent(sliderInput, 'input').pipe(
  debounceTime(2000),
  map(event => event.target['value' as keyof EventTarget]),
).subscribe(value => console.log(value));

// ----- CATCHERROR ----- and ----- EMPTY -----
// fallback source / observable for original source
// catches the error and emits a fallback observable

const failingHttpRequest$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.error(new Error('Timeout'));
  }, 3000);
});

// failingHttpRequest$.pipe(
//   // catchError(error => of('Fallback Value'),
//   catchError(error => EMPTY)
//  ).subscribe({
//    next: value => console.log(value),
//    complete: () => console.log('Completed'),
//    error: error => console.log('Error', error),
// });


// ----- FLATTENING OPERATORS -----

// ----- CONCATMAP -----

const source$ = new Observable(subscriber => {
  setTimeout(() => {
    subscriber.next('A');
  }, 2000);
  setTimeout(() => {
    subscriber.next('B');
  }, 5000);
});

// source$.pipe(
//   concatMap(value => of(1, 2)), // this will be emited with every next notification
// ).subscribe(value => console.log(value));

const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

// fromEvent(fetchButton, 'click').pipe(
//   map(() => endpointInput.value),
//   concatMap(value => (
//     ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     // ajax(`https://non-existing-endpoint`)
//   )),
//   catchError(() => EMPTY), // will immediately complete, outer subscription ends!!
// ).subscribe({              // app no longer working
//    next: value => console.log(value),
//    error: error => console.log('Error: ', error),
//    complete: () => console.log('Completed'), 
// });

// keep app working when error in inner observable:

fromEvent(fetchButton, 'click').pipe(
  map(() => endpointInput.value),
  concatMap(value => (
    ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
      catchError(error => of(`Could not fetch data: ${error}`)), // handle error here
    )
  )),
).subscribe({          
   next: value => console.log(value),
   error: error => console.log('Error: ', error),
   complete: () => console.log('Completed'), 
});


// ! the pipeable operators differ in CONCURRENCY behaviour !

// CONCATMAP
// concatMap => queues / buffers outer observables
// the next outer observable starts when the inner has finished
// inner observables will always emit in same order as outer observables
// we will always have the latest value handled (db storage)
// downside: possible delayed reactions

// SWITCHMAP
// switchMap => CANCELS the running subscription 
// and SWITCHES to new subscription
// faster, quick reaction to source values
// => don't use for db storage, but for fetch

// MERGEMAP
// mergeMap => creates concurrent inner observables
// outer observables don't have to 'wait'
// it can happen, that the inner observable of outerA
// emits after the inner observable of outerB
// downside:
// can lead to many concurrent inner subscriptions
// !memory leaks when they are not all completed!


// ----- SUBJECT -----

const emitButton = document.querySelector('button#emit');
const inputElement: HTMLInputElement = document.querySelector('#value-input');
const subscribeButton = document.querySelector('button#subscribe');

// SUBJECT
const value$ = new Subject<string>();

// fromEvent(emitButton, 'click').subscribe(
//   () => value$.next(inputElement.value)
// );

fromEvent(emitButton, 'click').pipe(
  map(() => inputElement.value)
).subscribe(value$); // pass subject as observer
// next / error / complete to all active subscriptions

fromEvent(subscribeButton, 'click').subscribe(
  () => {
    console.log('New Subscription');
    value$.subscribe(value => console.log('Value', value));
  }
)

// BEHAVIOUR SUBJECT => memory for initial value
const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

const isLoggedIn$ = new BehaviorSubject<boolean>(false); // provide initial value 

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Navigation bar => first subscription
isLoggedIn$.subscribe(
  isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
);

// Buttons => second subscription
isLoggedIn$.subscribe(
  isLoggedIn => {
   logoutButton.style.display = isLoggedIn ? 'block' : 'none';
   loginButton.style.display = !isLoggedIn ? 'block' : 'none';
  }
)

// Access subject value

// fromEvent(printStateButton, 'click').subscribe(
//   () => console.log('User is logged in: ', isLoggedIn$.value)
// );

// more reactive way (-;
fromEvent(printStateButton, 'click').pipe(
  withLatestFrom(isLoggedIn$)
).subscribe(
  ([event, bool]) => console.log('User is logged in: ', bool)
);





