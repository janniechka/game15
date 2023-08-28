// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript

type TransmittonStates = 'auto' | 'manual';

enum TransmissionEnum {
    Manual = 'manual',
    Auto = 'auto'
}

interface Car {
    seates: number;
    passengers?: number | null;
    transmitton: TransmissionEnum; // or TransmittonStates
    brand: string
}

const car: any = {
    seates: 4,
    transmitton: 'auto',
    brand: 'BMW'
}

car.passengers = 2;

const car2: Car = {
    seates: 4,
    transmitton: TransmissionEnum.Auto,  // or 'auto'
    brand: 'BMW',
    // passengers: null
}

car2.passengers = 2;

type StringNumber = number | string;

type StringNumberArr = StringNumber[];

const testArr: StringNumberArr = [1, 3, '5', 'null'];

enum MachineState {
    Off,
    On,
    Error
}

console.log('on: ', MachineState.On);

