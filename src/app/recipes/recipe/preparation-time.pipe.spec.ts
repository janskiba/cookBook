import { PreparationTimePipe } from './preparation-time.pipe';

describe('PreparationTimePipe', () => {
  it('create an instance', () => {
    const pipe = new PreparationTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('properly convert minutes to Xh Xm format', () => {
    const pipe = new PreparationTimePipe();
    expect(pipe.transform(90)).toEqual('1h 30m');
  });
});
