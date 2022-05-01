// {
//   interface Either {
//     left: () => number;
//     right: () => number;
//   }

//   class SimpleEither implements Either {
//     constructor(private leftVal: number, private rightVal: number) {}

//     left(): number {
//       return this.leftVal;
//     }
//     right(): number {
//       return this.rightVal;
//     }
//   }
//   const either = new SimpleEither(2, 3);
//   either.left();
//   either.right();
// }

{
  interface Either<L, R> {
    left: () => L;
    right: () => R;
  }

  class SimpleEither<L, R> implements Either<L, R> {
    constructor(private leftVal: L, private rightVal: R) {}

    left(): L {
      return this.leftVal;
    }
    right(): R {
      return this.rightVal;
    }
  }
  const either = new SimpleEither(2, 3);
  either.left();
  either.right();

  const eitherMix = new SimpleEither(4, "hello");
  const eitherObj = new SimpleEither({ name: "jun" }, 23);
}
