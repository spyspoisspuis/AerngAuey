export const fetchWorldTime = async (timezone: string) => {
  try {
    const response = await fetch(
      `http://worldtimeapi.org/api/timezone/${timezone}`
    );
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return error;
  }
};
