export const noInstanceFounded = new Error(
    'No MultiViewer instances founded on the requested host. Check if MultiViewer is running or if MultiViewer is allowed in your FireWall rules.'
);
export const invalidConfig = new Error('The config that as been given is not valid.')